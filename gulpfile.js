var gulp=require('gulp');
var gulp=require('gulp'),
    nodemon=require('gulp-nodemon');

gulp.task('default',function(){
    nodemon({
        script:'app.js',//Which file you want to run
        ext:'js',//When you want to restart server. For other files when you are going to create website then you can use like eg:(ext:'js html css font')
        env:{
            PORT:'8000'
        },
        ignore:['./node_module/**']
    }).on('restart',function(){
        console.log("Server is restarted...")
    });
})