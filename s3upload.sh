git init
git add .
git commit -m "deependra commited"
git push -u origin deependra
npm run build
aws s3 cp /home/deependra97/Documents/practice/examsite/build s3://www.examsite.com/ --recursive
