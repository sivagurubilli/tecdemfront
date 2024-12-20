import messageService from "../MessageService/Index";
import { TecButton } from "../elements/elements";
import styles from "./SaveButton.module.css"
const SaveButton = (props) => {
    const { onCancel, onSave } = props;
    return <div className={`${styles?.saveButtonWrapper} tec-shadow paddingLeftRight-3`}>
        <div className={styles?.leftPanel}>
            <p>Do you want to save changes?</p>
        </div>
        <div className={`${styles?.rightPanel} marginTop-2`}>
            <TecButton
                title="Save"
                className="tecPrimaryButton"
                onClick={onSave}
                type="button"
                small
            />
            <TecButton
                title="Cancel"
                className="tecSecondaryButton"
                onClick={onCancel}
                small
            />


        </div>
    </div>
}

export default SaveButton;