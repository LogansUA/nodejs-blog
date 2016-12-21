import * as constants from './../../app/models/constants';

exports = {
    truncate: (str, n, useWordBoundary) => {
        if (str) {
            let isTooLong = str.length > n,
                s_ = isTooLong ? str.substr(0, n - 1) : str;
            s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;

            return isTooLong ? s_ + '...' : s_;
        }

        return '';
    },
    isAdmin: (user, options) => {
        if (user.role == constants.ROLE_ADMIN) {
            return options.fn(this);
        }

        return options.inverse(this);
    },
};