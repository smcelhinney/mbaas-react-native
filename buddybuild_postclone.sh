echo '=== Running Post Clone Script ==='

cd $BUDDYBUILD_WORKSPACE

# Install npm modules so we can build typescript
echo '=== Install NPM modules ==='
yarn install --ignore-engines

# Run typescript compliler using locally installed version
echo '=== Run Typescript Compiler ==='
yarn run compile

echo '=== Running Tests with Jest ==='
yarn test

if [ $? -eq 0 ]
then
  echo "Jest Snapshot Tests Successful!"
else
  asd="
      ___         ___                               
     /  /\       /  /\        ___                   
    /  /:/_     /  /::\      /  /\                  
   /  /:/ /\   /  /:/\:\    /  /:/      ___     ___ 
  /  /:/ /:/  /  /:/~/::\  /__/::\     /__/\   /  /\
 /__/:/ /:/  /__/:/ /:/\:\ \__\/\:\__  \  \:\ /  /:/
 \  \:\/:/   \  \:\/:/__\/    \  \:\/\  \  \:\  /:/ 
  \  \::/     \  \::/          \__\::/   \  \:\/:/  
   \  \:\      \  \:\          /__/:/     \  \::/   
    \  \:\      \  \:\         \__\/       \__\/    
     \__\/       \__\/                              
  "
  echo $asd
  echo "=== Jest Snapshot Tests Failing. Aborting build ==="
  exit 1
fi