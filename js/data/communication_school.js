/**
 * SpacePoint Software Guide Platform
 * data/communication_school.js - Simplified Communication Interfaces (School Level)
 */

if (window.getUserType() === 'school') {
window.spacePointData.categories.push({
    id: 'comms',
    title: 'Communication Interfaces',
    description: 'How computer chips talk to each other.',
    icon: 'network',
    timeEstimate: '45 min',
    color: 'from-green-400 to-teal-400',
    lessons: [
        { 
            id: 'can', 
            title: 'CAN Bus', 
            time: '10 min', 
            content: `
                <h3 class="text-xl font-bold mb-2">CAN Bus: The Message Board</h3>
                <p class="mb-4">Imagine a classroom where everyone is talking. If everyone talks at once, it's chaos! CAN Bus is like raising your hand.</p>
                
                <div class="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 mb-6">
                    <h4 class="font-bold text-purple-300 mb-2">How it works:</h4>
                    <p class="text-gray-300 text-sm">
                        It's like a <strong>Group Chat</strong> for the satellite parts. Everyone can see every message, but you only listen to the ones meant for you.
                    </p>
                    <ul class="list-disc list-inside mt-2 text-sm text-gray-300">
                        <li><strong>Priority:</strong> Important messages (like "Battery Low") get to go first.</li>
                        <li><strong>Safe:</strong> It uses two wires to make sure the message doesn't get messed up by noise.</li>
                    </ul>
                </div>
            ` 
        },
        { 
            id: 'uart', 
            title: 'UART', 
            time: '10 min', 
            content: `
                <h3 class="text-xl font-bold mb-2">UART: Passing Notes</h3>
                <p class="mb-4">UART is the simplest way for two chips to talk. It's like passing a note to your friend in class.</p>
                
                <div class="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 mb-6">
                    <h4 class="font-bold text-purple-300 mb-2">Key Concepts:</h4>
                    <ul class="list-disc list-inside mt-2 text-sm text-gray-300">
                        <li><strong>Direct Connection:</strong> Only two people can talk (You and Your Friend).</li>
                        <li><strong>Speed:</strong> You both have to agree on how fast to write/read (Baud Rate).</li>
                        <li><strong>TX & RX:</strong> Your mouth (TX) talks to their ear (RX).</li>
                    </ul>
                </div>
            ` 
        },
        { 
            id: 'i2c', 
            title: 'I2C', 
            time: '15 min', 
            content: `
                <h3 class="text-xl font-bold mb-2">I2C: The Master and Servants</h3>
                <p class="mb-4">I2C is used when one "Master" brain needs to control many "Slave" parts (like sensors).</p>
                
                <div class="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 mb-6">
                    <h4 class="font-bold text-purple-300 mb-2">Analogy:</h4>
                    <p class="text-gray-300 text-sm">
                        Think of a teacher (Master) calling on students (Slaves) by name.
                    </p>
                    <ul class="list-disc list-inside mt-2 text-sm text-gray-300">
                        <li><strong>Addresses:</strong> Every sensor has a unique ID number, like a name.</li>
                        <li><strong>Wires:</strong> Uses only 2 wires to connect many things!</li>
                    </ul>
                </div>
            ` 
        },
        { 
            id: 'spi', 
            title: 'SPI', 
            time: '10 min', 
            content: `
                <h3 class="text-xl font-bold mb-2">SPI: The Fast Lane</h3>
                <p class="mb-4">SPI is much faster than I2C. We use it when we need to move data quickly, like saving photos to an SD card.</p>
                
                <div class="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 mb-6">
                    <h4 class="font-bold text-purple-300 mb-2">How it works:</h4>
                    <ul class="list-disc list-inside mt-2 text-sm text-gray-300">
                        <li><strong>Speedy:</strong> It's like a firehose of data!</li>
                        <li><strong>4 Wires:</strong> It needs more wires than I2C, but that's why it's faster.</li>
                    </ul>
                </div>
            ` 
        }
    ]
});
}
