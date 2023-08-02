import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import cleanCss from 'gulp-clean-css';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true})
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(concat('style'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}


export const cssChangeName = () => {
    const currentTime = new Date().getTime();
    const newName = `.v=${currentTime}.css`;


    return app.gulp.src(app.path.src.scss, { sourcemaps: true})
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(concat('style'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: newName
        }))
        .pipe(app.plugins.replace(/<link rel="stylesheet" href="style(.*)\.css">/g, `<link rel="stylesheet" href="${updatedStyleLink}">`))
        .pipe(app.gulp.dest(app.path.build.css))
}


// export const updateHtmlStyles = () => {
//     const currentTime = new Date().getTime();
//     const updatedStyleLink = `style.v=${currentTime}.css`;

//     return app.gulp.src(app.path.build.html)
//         .pipe(app.gulp.dest(app.path.build.html));
// }