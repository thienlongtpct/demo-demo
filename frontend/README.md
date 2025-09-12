- Bạn mở terminal của phần frontend lên. Sau đó chạy lệnh:

```docker build --no-cache -t mta-whisper-frontend .```

- Đợi cho build xong thì bạn chạy lệnh sau:

```docker run -p 3000:3000 mta-whisper-frontend```

- Đợi ứng dụng chạy thì bạn mở link: localhost:3000 trên trình duyệt
