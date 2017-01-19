$(function () {
    $('.froala-editor').froalaEditor({
        imageUploadURL: '/upload_image',
        imageManagerLoadURL: '/delete_image',
        imageManagerDeleteURL: '/delete_image',
    });
});
