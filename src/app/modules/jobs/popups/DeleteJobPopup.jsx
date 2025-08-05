import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {supabase} from "../../../../supabaseClient.js";

const EditJobPopup = ({trigger, props, onCreate}) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true)

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data, error} = await supabase
                .from('job_positions')
                .delete()
                .eq('id', props?.id)

            if (onCreate) {
                onCreate();
            }
        } catch (error) {
            console.error('Error creating job:', error);
        } finally {
            close();
        }
    };

    const open = () => setVisible(true);
    const close = () => {
        setVisible(false);
    }

    const triggerWithClick = React.cloneElement(trigger, {
        onClick: open,
    });

    return (
        <>
            {triggerWithClick}
            <Dialog className="lg:w-1/2 md:w-[80%]" header="Delete Job" visible={visible} onHide={close} draggable={false} modal>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <p>Are you sure you want to delete this job?</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="button" onClick={close} severity='secondary' label='Close'/>
                        <Button
                            type='submit'
                            severity='info'
                            label='Save'
                        />
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default EditJobPopup;
