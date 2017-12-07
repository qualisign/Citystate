export default {
    kind: 'contractProposal',
    lifecycle: [
        {
            title: 'Creation',
            description: 'Define your conditions'
        },
        {
            title: 'Negotiation',
            description: 'Agree on conditions'
        },
        {
            title: 'Voting',
            description: 'Get community approval'
        },
        {
            title: 'Construction',
            description: 'Build the specification'
        },
        {
            title: 'Evaluation',
            description: 'Specification fulfilled?'
        },

        {
            title: 'Deployment',
            description: 'Deploy to blockchain'
        },
        {
            title: 'Destruction',
            description: 'Remove from results'
        }
    ],
    upvotes: 0,
    downvotes: 0,
    phase: 0,
    title: '',
    specification: {
        description: '',
        feature: ''
    },
    roles: {
        manager: {
            id: 1,                         
            reputation: [
                {
                    
                },
                {

                },
                {

                }                                 
            ]
        },
        worker: {
            id: 0,
            accepted: false,
            reputation: {
                global: []
            }
        },
        evaluator: {
            id: 0,
            accepted: false,
            reputation: {
                global: []
            }
        }                     
    },
    stakes: {
        min: 1,
        max: 5,
        goal: 50,
        start: 5,
        colony: 50,
    },
    pot: {
        manager: 33,
        worker: 33,
        evaluator: 33
        
    },
    dividends: {
        manager: 16,
        evaluator: 16,
        worker: 16,
        backers: 50
        
    },
    classifiers: [],
    prerequisites: [                     
    ],
    backers: [],
    selectedCategories: [],
    
}
