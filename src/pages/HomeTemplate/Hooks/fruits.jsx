import {memo} from 'react'

 function Fruit({ fruit, onDelete }) {
    const { id, name } = fruit; 
    console.log(`fruit render id: ${id}`);

    return (
        <div className="border p-2 mb-2">
            Id: {id} - Name: {name}
            <button 
                onClick={() => onDelete(id)} 
                className='bg-red-500 text-white ml-5 px-2 py-1 rounded'
            >
                Delete
            </button>
        </div>
    );
}

export default memo(Fruit);