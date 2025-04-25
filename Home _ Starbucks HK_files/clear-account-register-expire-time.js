define(
    [
        "jquery"
    ],
    function ($) {
        return function clear_account_register_expire_time() {
            //console.log('Code cua Tai every page');
            let accountRegisterArr = JSON.parse(localStorage.getItem("accountRegister"));
            if (accountRegisterArr !== null && accountRegisterArr[13] !== undefined) {
                const now = new Date();
                if (now.getTime() > accountRegisterArr[13].value) {
                    localStorage.setItem("accountRegister", null);
                }
            }
        }
    })