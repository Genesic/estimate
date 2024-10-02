FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod ./

COPY . .

RUN go build -o /ping-server

# 使用轻量级的基础镜像
FROM scratch

# 设置工作目录
WORKDIR /root/

# 从构建阶段复制构建好的二进制文件
COPY --from=builder /ping-server .

# 暴露端口
EXPOSE 8080

# 启动应用程序
CMD ["./ping-server"]
