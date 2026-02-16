/**
 * SpacePoint Software Guide Platform
 * activities.js - Interactive Lesson Builders
 */

window.Activities = {
    state: {
        i2c: {
            devices: [] // { type: 'master'|'slave', name: string, icon: string }
        }
    },

    // ============================================
    // I2C ARCHITECTURE BUILDER
    // ============================================

    renderI2CBuilder(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Reset state on load
        this.state.i2c.devices = [];

        container.innerHTML = `
            <div class="bg-black/40 border border-purple-500/30 rounded-xl p-4 mt-4">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="font-bold text-purple-300 flex items-center gap-2">
                        <i data-lucide="cpu" class="w-5 h-5"></i>
                        I2C Lab: Build the Network
                    </h4>
                    <div class="flex gap-2">
                        <select id="i2c-component-select" class="bg-purple-900/50 border border-purple-500/30 rounded px-3 py-1 text-sm text-white focus:outline-none">
                            <option value="master">Microcontroller (Master)</option>
                            <option value="temp">Temp Sensor (Slave)</option>
                            <option value="display">OLED Screen (Slave)</option>
                            <option value="gyro">Gyroscope (Slave)</option>
                        </select>
                        <button onclick="Activities.addI2CDevice()" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-sm font-bold transition-colors">
                            + Add Device
                        </button>
                    </div>
                </div>

                <!-- Visualization Area -->
                <div class="relative h-64 bg-[#1a0526] border border-gray-800 rounded-lg overflow-hidden mb-4" id="i2c-viz">
                    <!-- Bus Lines -->
                    <div class="absolute top-1/2 left-0 w-full h-8 -mt-4 flex flex-col justify-center space-y-2">
                        <div class="w-full h-1 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] relative group">
                            <span class="absolute right-2 -top-4 text-[10px] text-yellow-400 opacity-50 font-mono">SDA (Data)</span>
                        </div>
                        <div class="w-full h-1 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)] relative">
                             <span class="absolute right-2 top-2 text-[10px] text-blue-400 opacity-50 font-mono">SCL (Clock)</span>
                        </div>
                    </div>
                    
                    <!-- Devices Container -->
                    <div id="i2c-devices" class="absolute inset-0 flex items-center justify-around px-8 pointer-events-none">
                        <!-- Devices injected here -->
                        <div class="text-gray-600 text-sm">Add devices to start building...</div>
                    </div>
                </div>

                <!-- Feedback Area -->
                <div class="flex justify-between items-center">
                    <div id="i2c-feedback" class="text-sm text-gray-400 italic">
                        Add a Master Controller to start.
                    </div>
                    <div class="flex gap-2">
                        <button onclick="Activities.resetI2C()" class="text-red-400 text-xs hover:text-red-300 underline">Reset</button>
                        <button onclick="Activities.verifyI2C()" class="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded text-sm font-bold transition-colors shadow-lg shadow-green-900/20">
                            Check Connections
                        </button>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    },

    addI2CDevice() {
        const select = document.getElementById('i2c-component-select');
        const type = select.value;
        const feedback = document.getElementById('i2c-feedback');
        
        // Validation Logic
        const hasMaster = this.state.i2c.devices.some(d => d.role === 'master');
        
        if (type === 'master') {
            if (hasMaster) {
                this.showFeedback('⚠️ Only one Master device is allowed!', 'text-yellow-400');
                return;
            }
            this.state.i2c.devices.push({
                role: 'master',
                name: 'MCU (Master)',
                icon: 'cpu',
                color: 'text-purple-400'
            });
        } else {
            if (this.state.i2c.devices.length >= 5) {
                this.showFeedback('⚠️ Bus is full!', 'text-yellow-400');
                return;
            }
            let name = 'Sensor';
            let icon = 'activity';
            if (type === 'temp') { name = 'TMP102'; icon = 'thermometer'; }
            if (type === 'display') { name = 'OLED'; icon = 'monitor'; }
            if (type === 'gyro') { name = 'IMU'; icon = 'compass'; }

            this.state.i2c.devices.push({
                role: 'slave',
                name: name,
                icon: icon,
                color: 'text-teal-400'
            });
        }

        this.updateI2CViz();
        this.showFeedback('Device added to bus.', 'text-gray-300');
    },

    updateI2CViz() {
        const container = document.getElementById('i2c-devices');
        if (this.state.i2c.devices.length === 0) {
            container.innerHTML = '<div class="text-gray-600 text-sm">Add devices to start building...</div>';
            return;
        }

        container.innerHTML = this.state.i2c.devices.map(device => `
            <div class="relative group pointer-events-auto transition-all p-2 rounded-lg bg-black/80 border ${device.role === 'master' ? 'border-purple-500 shadow-purple-500/20' : 'border-teal-500 shadow-teal-500/20'} border shadow-lg flex flex-col items-center gap-2 w-24">
                <!-- Data Lines Connection -->
                <div class="absolute -top-8 w-0.5 h-8 bg-gray-500 group-hover:bg-white transition-colors"></div>
                
                <i data-lucide="${device.icon}" class="w-8 h-8 ${device.color}"></i>
                <span class="text-[10px] font-bold text-gray-300">${device.name}</span>
                <span class="text-[8px] uppercase tracking-wider ${device.role === 'master' ? 'bg-purple-900 text-purple-200' : 'bg-teal-900 text-teal-200'} px-1 rounded">${device.role}</span>
            </div>
        `).join('');
        
        lucide.createIcons();
    },

    resetI2C() {
        this.state.i2c.devices = [];
        this.updateI2CViz();
        this.showFeedback('Lab reset.', 'text-gray-400');
    },

    verifyI2C() {
        const hasMaster = this.state.i2c.devices.some(d => d.role === 'master');
        const slaveCount = this.state.i2c.devices.filter(d => d.role === 'slave').length;

        if (!hasMaster) {
            this.showFeedback('❌ Missing a Master Controller!', 'text-red-400');
        } else if (slaveCount === 0) {
            this.showFeedback('❌ The Master is lonely. Add some sensors!', 'text-red-400');
        } else {
            this.showFeedback(`✅ SUCCESS! Master connected to ${slaveCount} device(s).`, 'text-green-400 font-bold');
        }
    },

    showFeedback(msg, classes) {
        const el = document.getElementById('i2c-feedback');
        if (el) {
            el.className = `text-sm ${classes} animate-pulse`;
            el.textContent = msg;
        }
    }
};
