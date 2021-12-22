echo "Starting Up Dependenct Services"
echo ""
cd ../service

nohup npm start 0 > /dev/null 2>&1 &

cd ../tests

sleep 3

echo "Done Sarting Up Dependent Services"
echo ""

echo "Running Tests..."
echo ""

npm run test

echo "Cleaning Up..."
kill %1
echo "Done Cleaning Up"
