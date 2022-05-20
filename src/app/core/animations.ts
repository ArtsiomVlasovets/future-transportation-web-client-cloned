import {animate, state, style, transition, trigger} from '@angular/animations';

export function fadeInOutAnimation(fadeInTime: number = 250, fadeOutTime: number = 250) {
    return trigger('fadeInOut', [
        transition('void => *', [
            style({opacity: 0}),
            animate(fadeInTime, style({opacity: 1}))
        ]),
        transition('* => void', [
            animate(fadeOutTime, style({opacity: 0}))
        ])
    ]);
}

export function expandAnimation(enterTime: number = 250, leaveTime: number = 250) {
    return trigger('expand', [
        state('*', style({'overflow-y': 'hidden'})),
        state('void', style({'overflow-y': 'hidden'})),
        transition('* => void', [
            style({height: '*'}),
            animate(leaveTime, style({height: 0}))
        ]),
        transition('void => *', [
            style({height: '0'}),
            animate(enterTime, style({height: '*'}))
        ])
    ]);
}