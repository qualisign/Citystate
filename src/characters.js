export default [
    {
        name: 'Consumer',
        disabled: false,
        attained: false,
        visible: true,
        prerequisites: [
            'none'
        ],
        
        description: 'For most, the journey into Polis starts here.  Take this path to begin making purchases.',
        steps: [
            {
                value: 0,
                instructions: 'Accept an offer.',
                permission: 'acceptOffers',
                trigger: 'acceptedAnOffer'
            },
            {
                value: 1,
                instructions: 'Rate an offer',
                permission: 'rateOffers',
                trigger: 'ratedAnOffer'
            }
        ]        
    },
    {
        name: 'Merchant',
        disabled: false,
        attained: false,
        visible: true,
        prerequisites: [
            'none'

        ],
        
        description: 'You have a product, service, or other offer for consumers.',
        steps: [
            {
                value: 0,
                instructions: 'Make an offer.',
                permission: 'makeOffers'
            },
            {
                value: 1,
                instructions: 'Have it accepted.',
                permission: 'rateConsumers'
            },
        ]
        
    },
    
    {
        name: 'Herald',
        disabled: true,
        attained: false,
        visible: true,
        description: 'Help the Polis stay informed.',
        prerequisites: [
            /*
            {
                kind: 'path',
                value: 'Merchant'
            },
            {
                kind: 'path',
                value: 'Consumer'
            },
            */
            {
                kind: 'permission',
                value: 'makeOffers',
                label: 'make offers'                
            }

        ],
        permissions: [
            {
                name: 'Make content',
                
            }
        ]        
    },    
    {
        name: 'Manager',
        disabled: true,
        attained: false,
        visible: true,
        prerequisites: [
            {
                kind: 'path',
                value: 'Entrepreneur'
            },
            {
                kind: 'reputation',
                ref: 'global/',
                value: 20
            },

        ],
        permissions: [
            {
                name: 'Create proposals'
            }
        ]
        
    },
    {
        name: 'Worker',
        disabled: true,
        attained: false,
        visible: true,
        prerequisites: [
            {
                kind: 'path',
                value: 'Manager'
            },
            {
                kind: 'reputation',
                ref: 'global/',
                value: 20
            },

        ],
        permissions: [
            {
                name: 'Accept work for proposals'
            }
        ]
        
    },
    {
        name: 'Evaluator',
        disabled: true,
        attained: false,
        visible: true,                     
        prerequisites: [
            {
                kind: 'path',
                value: 'Worker'
            },
            {
                kind: 'reputation',
                ref: 'global/',
                value: 20
            },

        ],
        permissions: [
            {
                name: 'Evaluate proposals'
            }
        ]
        
    },
    {
        name: 'Entrepreneur',
        disabled: true,
        attained: false,
        visible: true,
        description: 'You understand how value is created and consumed in Polis.  You are ready to use this knowledge to succeed.',
        prerequisites: [
            {
                kind: 'path',
                value: 'Evaluator'
            },
            {
                kind: 'path',
                value: 'Reporter'
            },
            ,
            {
                kind: 'reputation',
                ref: 'global/',
                value: 50
            },
            
        ],
        permissions: [
            {
                name: 'Fund proposals'
            }
        ]
            
        
    },    
    {
        name: 'Innovator',
        disabled: true,
        attained: false,
        visible: false,
        prerequisites: ['Evaluator'],
        
    },
    {
        name: 'Developer',
        disabled: true,
        attained: false,
        visible: false,
        prerequisites: ['Evaluator'],
        
        
    },
    {
        name: 'Tester',
        disabled: true,
        attained: false,
        visible: false,
        prerequisites: ['Evaluator'],
        
        
    },
    {
        name: 'Educator',
        disabled: true,
    },
    {
        name: 'Statesman',
        disabled: true,
    },
    {
        name: 'Guardian',
        disabled: true,
        visible: true
    },                 
    
]
