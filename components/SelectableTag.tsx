import { memo } from "react";

interface iSelectableTag{
    id: string,
    item: string,
    isSelected: boolean ,
    onToggleFn: (id: string) =>  void,
}

/**
 * Component that change appearance when selected with `React.memo` utilisation
 * @param id used to identified between the `item` and their siblings
 * @param item the text display
 * @param isSelected the state of the `item` (note: should be handle in its parent's level state or with using any state management libraries).
 * @param onToggleFn function to be invoked when the tag is being selected or deselected. It's is flexible to accept any state management solutions.
 *
 *
 * NOTE: The component use `React.memo` -> consider wrapping the `onToggleFn` with `useCallback` hook to avoid any unnecessary re-rendering. It is due to `React` works by re-creating any function except for `useCallback`
 */
export const SelectableTag = memo((props: iSelectableTag) => {
    console.log(`${props.item} : `, props.isSelected);

    return (
        <button onClick={()=>props.onToggleFn(props.id)} className={`h-7 px-3 py-1 rounded-2xl overflow-clip style-small-text duration-300 transition-all ease-in-out ${props.isSelected? 'bg-primary-t5 text-on-primary text-opacity-60':'bg-themed-gray-t3 text-themed-gray-t9'}`}>{props.item}</button>
    )
 })