echo "-- start build script --"

dev=dev/javascripts
outjs=public/javascripts
sass=dev/sass
outcss=public/stylesheets
babel=dev/babel
browserify="main.js"
ignore=""

for file in $browserify
do
  ignore="$ignore $babel/$file"
done

ignore=$(echo $ignore | tr [:space:] ',' | sed 's/,$//')

babel $dev -d $babel

for file in $browserify
do
  browserify $babel/$file -o $outjs/$file
done

babel $babel -d $outjs --ignore $ignore
#sass --update $sass:$outcss

echo "-- build script finished --"
