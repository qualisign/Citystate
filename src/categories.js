export default [
    {
        value: 'Offers',
        label: 'Offers',
        ref: 'Offers/',
        children: [
	    {
                value: 'Internet',
		label: 'Internet',
		ref: 'Offers/Internet/',                     
	    },
	    {
		label: 'Energy',
                value: 'Energy',
		ref: 'Offers/Energy/',		     
	    },
	    {
		label: 'Housing',
                value: 'Housing',
		ref: 'Offers/Housing/',
		children: [
                    {
                        label: 'Rent',
                        value: 'Rent',
                        ref: 'Offers/Housing/Rent'
                    },
                    {
                        label: 'Buy',
                        value: 'Buy',
                        ref: 'Offers/Housing/Buy'
                    }                         
                ]
	    },
	    {
		label: 'Food',
                value: 'Food',
		ref: 'Offers/Food/',		     
	    },
	    {
		label: 'Transportation',
                value: 'Transportation',
		ref: 'Offers/Transportation/',
		children: [
		    {
			label: 'Delivery',
                        value: 'Delivery',
			ref: 'Offers/Transportation/Delivery/'
		    },
		    {
                        value: 'Rideshare',
			label: 'Rideshare',
			ref: 'Offers/Transportation/Rideshare/'
		    }
		]
	    }
        ]
    },
    {
        label: 'Content',
        value: 'Content',
        ref: 'Content/',
        children: [
            {
                label: 'Training',
                value: 'Training',
                ref: 'Content/Training'
            },
            {
                label: 'News',
                value: 'News',
                ref: 'Content/News'
            }
        ]
    }
]           
