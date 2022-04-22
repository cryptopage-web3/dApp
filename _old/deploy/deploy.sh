#unclude utils
. $(dirname "$0")/utils.sh

deploy_dir=/home/user/deploy
run_dir=/home/user/crypto.page
deploy_port=3010
run_port=3000
pm2_deploy_name=crypto_twitter_deploy
pm2_run_name=crypto_twitter

tg_message "Deploy started"

echo "Stop server"

pm2 stop $pm2_deploy_name
pm2 delete $pm2_deploy_name

cd $deploy_dir

echo "deploy dir: $deploy_dir; run dir $run_dir"

echo "cleanup"

tg_message "pull changes from git started"

git checkout .

git pull 2>&1

exit_if_error "git pull failed"

rm -rf node_modules .nuxt

echo "install dependencies"

tg_message "install dependencies started"

npm i 2>&1

exit_if_error "install dependencies failed"

tg_message "build started"

export NUXT_TARGET=server
npm run build 2>&1

exit_if_error "build failed"

echo "Start deploy test server"

export NODE_ENV=production
export PORT=$deploy_port

pm2 start --name=$pm2_deploy_name npm -- start

echo "Sleep 5 sec"

sleep 5

http_response=$(curl -s -w "%{http_code}" -o /dev/null  --connect-timeout 1  "http://127.0.0.1:$deploy_port")

echo "port $deploy_port response: $http_response"

if [ "$http_response" != "200" ]; then
    tg_message "Server test start failed"
    exit 1
fi

tg_message "Build test: OK; start update site"

pm2 stop $pm2_deploy_name
pm2 delete $pm2_deploy_name

pm2 stop $pm2_run_name
pm2 delete $pm2_run_name

rm -rf $run_dir/node_modules $run_dir/.nuxt

cp -rf $deploy_dir/node_modules $run_dir/node_modules 2>/dev/null
cp -rf $deploy_dir/.nuxt $run_dir/.nuxt 2>/dev/null

cd $run_dir

export NODE_ENV=production
export PORT=$run_port

pm2 start --name=$pm2_run_name npm -- start

sleep 5

echo sleep 5 sec

http_response=$(curl -s -w "%{http_code}" -o /dev/null  --connect-timeout 1  "http://127.0.0.1:$run_port")
if [ "$http_response" != "200" ]; then
    tg_message "Server start failed"
    exit 1
fi

tg_message "deploy completed"

exit
exit
exit

exit
exit
exit
