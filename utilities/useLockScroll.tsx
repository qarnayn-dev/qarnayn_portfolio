
/**
 * To lock and unlock the window scroll. Return an object with function as the name described.
 * @returns {lockScroll, unlockScroll}
 */
export const useLockScroll = () => {

    function lockScroll() {
        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    function unlockScroll() {
        // Unsets Background Scrolling to use when SideDrawer/Modal is closed
        document.body.style.overflow = 'unset';
    }

    return { lockScroll: lockScroll, unlockScroll: unlockScroll };
}
