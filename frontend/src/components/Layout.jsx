import React ,{useState} from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
function Layout() {
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const handleclose=()=>{
        setIsCreateTaskOpen(!isCreateTaskOpen)
    }
    const toggleCreateTask = () => {
        setIsCreateTaskOpen(!isCreateTaskOpen);
    };
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                {/* <CreateTask /> */}
                <div className='task-container w-auto mx-5 md:w-1/3 mt-3'>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>
                    <button
                onClick={toggleCreateTask}
                className="fixed bottom-5 right-5 z-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
            >
                {isCreateTaskOpen ? 'Close' : 'New Task'}
            </button>
            {isCreateTaskOpen && (
                <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
                        <CreateTask handleclose={handleclose}/>
                        <div className='flex justify-center'>
                        <button
                        onClick={handleclose}
                            className="mt-5 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 items-center justify-center"
                        >Close</button>
                    </div>
                    </div>
                </div>
            )}
                </div>
            </div>
        </div>
    );
}

export default Layout;