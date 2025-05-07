import { comments } from "./comments.api";

const fetchAll = () => new Promise((resolve) => {
    window.setTimeout(function () {
        resolve(comments);
    }, 200);
});
