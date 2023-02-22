## Service File Runs on linux to keep pocketbase running, placed in the root@$lib/systemd/system directory
[Unit]
Description = pocketbase

[Service]
Type           = simple
User           = root
Group          = root
LimitNOFILE    = 4096
Restart        = always
RestartSec     = 5s
StandardOutput = append:/root/pb/errors.log
StandardError  = append:/root/pb/errors.log
ExecStart      = /root/pb/pocketbase serve --http="yourdomain.com:80" --https="yourdomain.com:443"

[Install]
WantedBy = multi-user.target
____

