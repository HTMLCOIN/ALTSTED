export const oppSpringContractABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "getHeir",
        "outputs": [
            {
                "name": "result",
                "type": "string"
            },
            {
                "name": "heirFullName",
                "type": "string"
            },
            {
                "name": "motherFullName",
                "type": "string"
            },
            {
                "name": "fatherFullName",
                "type": "string"
            },
            {
                "name": "dateOfBirth",
                "type": "uint256"
            },
            {
                "name": "timeOfBirth",
                "type": "uint256"
            },
            {
                "name": "placeOfBirth",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "hash",
                "type": "string"
            },
            {
                "name": "heirFullName",
                "type": "string"
            },
            {
                "name": "motherFullName",
                "type": "string"
            },
            {
                "name": "fatherFullName",
                "type": "string"
            },
            {
                "name": "dateOfBirth",
                "type": "uint256"
            },
            {
                "name": "timeOfBirth",
                "type": "uint256"
            },
            {
                "name": "placeOfBirth",
                "type": "string"
            }
        ],
        "name": "newHeir",
        "outputs": [
            {
                "name": "result",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "heirEvent",
        "type": "event"
    }
]