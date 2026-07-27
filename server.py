#!/usr/bin/env python3
"""一体化服务器：静态文件 + 微信读书 API 代理"""
import http.server
import json
import urllib.request
import os

WEREAD_API_KEY = 'wrk-WCFUA3ijTlSB61zr90b04AAA'
WEREAD_API_URL = 'https://i.weread.qq.com/api/agent/gateway'
PORT = 8000
DIR = '/workspace/self-improvement-workbench'


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/weread':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length) if length > 0 else b''

            req = urllib.request.Request(
                WEREAD_API_URL,
                data=body,
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {WEREAD_API_KEY}'
                },
                method='POST'
            )
            try:
                with urllib.request.urlopen(req, timeout=15) as resp:
                    data = resp.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(data)
            except Exception as e:
                self.send_response(502)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'errcode': -1,
                    'errmsg': f'代理请求失败: {e}'
                }).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')


if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', PORT), Handler)
    print(f'Server running on port {PORT}')
    server.serve_forever()
