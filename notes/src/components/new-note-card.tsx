import * as Dialog from '@radix-ui/react-dialog'
import { X }  from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function NewNoteCard(){

    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
    const [content, setContent] = useState('')

    function handleStartEditor(){
        setShouldShowOnBoarding(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)

        if(event.target.value == ''){
            setShouldShowOnBoarding(true)
        }
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()
        toast.success('note created!')
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md outline-none flex flex-col bg-slate-700 text-left p-5 gap-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-200'>Add note</span>
                <p className='text-sm leading-6 text-slate-400'>
                Record an audio note that will be coverted to text automatically.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
                <Dialog.Content className=' fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none'>
                    <Dialog.Close className=' absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>

                    <form onSubmit={handleSaveNote} className=' flex-1 flex flex-col'>
                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-300'>
                                add note
                            </span>
                            
                            {shouldShowOnBoarding ? (
                                <p className='text-sm leading-6 text-slate-400'>
                                start <button className=' font-medium text-lime-400 hover:underline'>recording an audio note</button> or just <button onClick={handleStartEditor} className=' font-medium text-lime-400 hover:underline'>write a text note</button>.
                                </p>
                            ) : (
                                <textarea 
                                autoFocus className=' text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                onChange={handleContentChanged}/>
                            )}
                        </div>

                        <button type='submit' className='w-ful bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>
                            save note
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}