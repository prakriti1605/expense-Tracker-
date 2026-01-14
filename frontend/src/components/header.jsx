import React from 'react'
import { Plus } from 'lucide-react'

const Header = ({ onAddExpense }) => {
    return (
        <div className='bg-white shadow-lg'>
            <div className='max-w-7xl mx-auto px-6 py-6 lg:py-4 flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-700 lg:text-4xl mb-1'>
                        Expense Tracker
                    </h1>
                    <p className='text-gray-700'>Manage your finance with ease</p>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={onAddExpense}  
                        className='px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center gap-2'
                    >
                        <Plus className='w-4 h-4' /> Add Expense
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
