## Service File can schedule and run prcoesses,when placed in the root/systemd/system directory

[Unit]
Description = pocketbase

[Service]
Type = simple
User = root
Group = root
LimitNOFILE = 4096
Restart = always
RestartSec = 5s
StandardOutput = append:/root/pb/errors.log
StandardError = append:/root/pb/errors.log
ExecStart = /root/pb/pocketbase serve --http="yourdomain.com:80" --https="yourdomain.com:443"

[Install]
WantedBy = multi-user.target

---

// TODO

## Crontabs perform regularly scheduled actions such as backups, report generation, and so on, placed in the ???? directory

[Unit]
Description = pocketbase

[Service]
Type = simple
User = root
Group = root
LimitNOFILE = 4096
Restart = always
RestartSec = 5s
StandardOutput = append:/root/pb/errors.log
StandardError = append:/root/pb/errors.log
ExecStart = /root/pb/pocketbase serve --http="yourdomain.com:80" --https="yourdomain.com:443"

[Install]
WantedBy = multi-user.target

---
