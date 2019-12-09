# Docker上のnodeで動作させる場合

セットアップはルートのREADME.mdを参照してください。

```
cd docker
docker-compose up -d
docker-compose exec node yarn
docker-compose exec node yarn wait-oauth
docker-compose exec node yarn read-stream
```
