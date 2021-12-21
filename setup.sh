echo "Installing Dependencies for Assets CLI"
echo ""
cd asset && npm install && cd ..
echo "Installing Dependencies for Assets CLI Complete"
echo ""

echo "Installing Dependencies for Server CLI"
echo ""
cd service && npm install && cd ..
echo "Installing Dependencies for Service CLI Complete"
echo ""

echo  "Installing Dependencies for Client CLI"  
echo ""
cd client && npm install && cd ..
echo "Installing Dependencies for Client CLI Complete"
echo ""

echo "Proceed to Starting Up each CLI in the order: Service, Assets, Client."