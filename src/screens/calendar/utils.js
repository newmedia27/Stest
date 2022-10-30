export const eventsCategory = [
	{
		label: "Meeting with an expert",
		value: "meeting",
	},
    {
		label: "Question-answer",
		value: "question",
	},
    {
		label: "Conference",
		value: "conference",
	},
    {
		label: "Webinar",
		value: "webinar",
	},
]

export const time = Array.from(new Array(24),(e,i)=>({label:`${i}:00`, value:`${i}:00`}))
