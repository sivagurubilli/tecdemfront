import { pipe, Subject } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
const subject = new Subject();

// Context - patient_banner, parent_child, actions

const messageService = {
    sendMessage: (
        senderId,
        message = {},
        target,
    ) => subject.next({
        text: message,
        senderId: senderId,
        target: target,
    }),
    clearMessages: () => subject.next(),
    onMessage: () => subject.asObservable().pipe(filter(m => m)),
};
export default messageService