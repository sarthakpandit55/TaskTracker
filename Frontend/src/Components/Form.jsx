import {useState} from 'react'

const Form = ({addTask}) => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "High",
        dueDate: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            ...formData,
            status: "Pending"
        });
        setFormData({           
            title: "",
            description: "",
            priority: "High",
            dueDate: ""
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="border rounded-md p-4">
                <div className="flex flex-wrap my-4">
                    <label className="text-lg font-semibold">Title:</label>
                    <input
                        className="w-full border mt-4 p-2 rounded-md"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-wrap my-4">
                    <label className="text-lg font-semibold">Description:</label>
                    <textarea
                        className="w-full border mt-4 p-2 rounded-md"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-wrap my-4">
                    <label className="text-lg font-semibold">Priority:</label>
                    <select
                        className="w-full border mt-4 p-2 rounded-md"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="flex flex-wrap my-4">
                    <label className="text-lg font-semibold">Due Date:</label>
                    <input
                        className="w-full border mt-4 p-2 rounded-md"
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-400 p-2 my-4 rounded-lg">
                    Add Task
                </button>
            </form>
        </>
    )
}

export default Form