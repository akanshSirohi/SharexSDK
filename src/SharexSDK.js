const developmentLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI1NHB0IiBoZWlnaHQ9IjEyNTRwdCIgdmlld0JveD0iMCAwIDEyNTQgMTI1NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgaWQ9IiMwMDAwMDBmZSI+DQo8cGF0aCBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSA1NTkuMTUgMjc5LjMyIEMgNTc4Ljg4IDI2OS4xNiA2MDAuOTMgMjY0LjA5IDYyMy4wMiAyNjIuODMgQyA2NTAuOTcgMjYxLjY3IDY3OS4zMSAyNjguNDEgNzAzLjM5IDI4Mi43NyBDIDcxMi45OSAyODguOTAgNzIyLjYxIDI5NS4xOCA3MzAuNTcgMzAzLjQxIEMgNzM2LjI5IDMwOC4wMyA3NDAuODYgMzEzLjgyIDc0NS40NSAzMTkuNTEgQyA3NTMuMzEgMzI4LjQ3IDc1OS4xMyAzMzkuMDAgNzY0LjQzIDM0OS42MSBDIDc2OS43OSAzNTkuNzMgNzcyLjkzIDM3MC44MyA3NzUuNzcgMzgxLjg2IEMgNzc5Ljc2IDM5OC4zNCA3ODAuMzAgNDE1LjM4IDc3OS40MSA0MzIuMjUgQyA4MDcuMjYgNDQ1LjU0IDgzNC4wNyA0NjEuNDAgODU3Ljc1IDQ4MS4zMCBDIDg2NC41MyA0ODYuMTAgODcwLjE2IDQ5Mi4yNCA4NzYuMzcgNDk3LjcxIEMgODk4LjE2IDUxNy44MyA5MTYuOTQgNTQxLjA5IDkzMi43MCA1NjYuMTcgQyA5MzcuNDggNTc1LjA3IDk0My4yNSA1ODMuNDAgOTQ3LjQ2IDU5Mi42MSBDIDk1Mi44NSA2MDQuMzEgOTU4LjQwIDYxNS45NiA5NjIuNzcgNjI4LjA5IEMgOTczLjk2IDY1OS4xOCA5ODAuOTQgNjkxLjkyIDk4MS42NCA3MjQuOTkgQyA5ODIuMDIgNzM1LjM5IDk4MS41MSA3NDUuODAgOTgxLjQ4IDc1Ni4yMCBMIDk4Mi4wMiA3NTcuMDggQyAxMDAwLjAxIDc2My4wNSAxMDE3LjI0IDc3MS45MSAxMDMxLjY3IDc4NC4zMiBDIDEwNjEuNDYgODA4LjYzIDEwODEuMDAgODQ0LjgyIDEwODUuNDIgODgyLjk3IEMgMTA4OS43MyA5MTcuNzQgMTA4MC45MCA5NTQuMDYgMTA2MC45NSA5ODIuOTAgQyAxMDU1LjU5IDk5MS42MyAxMDQ4LjI3IDk5OC44OCAxMDQxLjQ3IDEwMDYuNDYgQyAxMDI5LjU3IDEwMTcuMzUgMTAxNi40OCAxMDI3LjE1IDEwMDEuODIgMTAzNC4wMyBDIDk2My4xMiAxMDUyLjgxIDkxNi4zMCAxMDU0LjU1IDg3Ni42OCAxMDM3LjQ1IEMgODU4LjA2IDEwMjkuNDIgODQwLjg2IDEwMTcuODYgODI3LjAwIDEwMDMuMDAgQyA4MjMuNDEgOTk5LjU1IDgyMC4zNSA5OTUuNjMgODE2Ljk3IDk5MS45OSBDIDgxNi4yNiA5OTEuMDcgODE1LjA1IDk5MC4yNiA4MTUuMTUgOTg5LjAwIEMgODA5LjAwIDk5My44NCA4MDEuNzcgOTk3LjE2IDc5NS4xNCAxMDAxLjMyIEMgNzU3LjgwIDEwMjIuNzEgNzE2LjQ2IDEwMzcuMTkgNjczLjg1IDEwNDMuMzQgQyA2MjUuMDEgMTA0OS43MSA1NzQuNTAgMTA0Ni45MCA1MjcuNDcgMTAzMS42MyBDIDUxOS4xOCAxMDI5LjIzIDUxMS4xMSAxMDI2LjE0IDUwMi45NyAxMDIzLjMwIEMgNDkzLjU4IDEwMTkuMDIgNDg0LjE0IDEwMTQuODMgNDc0Ljc4IDEwMTAuNDggQyA0NjEuNTIgMTAwMy42MiA0NDguNzYgOTk1Ljg3IDQzNS45NyA5ODguMjAgQyA0MjYuNjggOTk4Ljc3IDQxNi45NSAxMDA5LjIyIDQwNS40MyAxMDE3LjQ1IEMgMzk1LjIzIDEwMjUuNTQgMzgzLjYzIDEwMzEuNjggMzcxLjY1IDEwMzYuNjkgQyAzNTguNzMgMTA0Mi4zNiAzNDQuODEgMTA0NS4zMiAzMzAuODggMTA0Ny4xOSBDIDMxOC4zMCAxMDQ3Ljk1IDMwNS41NSAxMDQ4LjQ4IDI5My4wNiAxMDQ2LjM5IEMgMjYyLjU2IDEwNDIuMzQgMjMzLjg2IDEwMjcuNTIgMjExLjk5IDEwMDYuMDIgQyAyMDcuNjAgMTAwMS40MSAyMDMuMTMgOTk2Ljg2IDE5OS4wMiA5OTIuMDAgQyAxODYuMjYgOTc1LjQ4IDE3Ni41MSA5NTYuNTYgMTcxLjE4IDkzNi4zNCBDIDE2MC43OSA4OTYuNzcgMTY4LjM3IDg1My4wNSAxOTEuMTAgODE5LjA2IEMgMjA4Ljk0IDc5MC42NyAyMzcuMjQgNzY5LjQ5IDI2OC43MSA3NTguMzkgQyAyNjkuODQgNzU3Ljc5IDI3MS44NSA3NTcuNTggMjcxLjU4IDc1NS44NSBDIDI3MS42MyA3MzguOTEgMjcxLjA0IDcyMS45MiAyNzMuMTYgNzA1LjA4IEMgMjc0LjYzIDY4NS42NyAyNzkuMDIgNjY2LjYxIDI4NC4zMyA2NDcuOTIgQyAzMDUuNzUgNTc0LjMxIDM1My44OCA1MDkuMzQgNDE2Ljc5IDQ2NS43OSBDIDQyMy41OCA0NjAuNzggNDMwLjc2IDQ1Ni4zNCA0MzcuOTMgNDUxLjkxIEMgNDQ4LjYwIDQ0NS45OCA0NTkuMDYgNDM5LjY1IDQ3MC4xOSA0MzQuNTkgQyA0NzEuNDggNDMzLjc2IDQ3My45NyA0MzMuMjAgNDczLjU0IDQzMS4xOCBDIDQ3Mi44MCA0MTUuMjUgNDczLjI2IDM5OS4xMyA0NzcuMDUgMzgzLjU3IEMgNDgyLjM3IDM1OS4xMSA0OTQuMzYgMzM2LjQxIDUxMC4yNCAzMTcuMTkgQyA1MjQuMDYgMzAxLjc2IDU0MC40MyAyODguMzggNTU5LjE1IDI3OS4zMiBNIDYxNi4yMSAzMDcuNjAgQyA2MDMuMDAgMzA5LjQyIDU4OS45NSAzMTMuMDYgNTc4LjEzIDMxOS4zMiBDIDU1Mi4xMiAzMzEuNjAgNTMyLjExIDM1NS4yNCA1MjMuMjYgMzgyLjUwIEMgNTIwLjU1IDM4OS42NSA1MTguODkgMzk3LjE5IDUxOC4zMyA0MDQuODEgQyA1MTcuMjAgNDEzLjE2IDUxNy4xMyA0MjEuNzIgNTE4LjQwIDQzMC4wNiBDIDUxOS42OCA0NDEuMDQgNTIyLjQwIDQ1MS45MiA1MjcuMjkgNDYxLjg4IEMgNTMxLjA2IDQ3MC43NiA1MzYuMjcgNDc5LjA1IDU0Mi43NCA0ODYuMjEgQyA1NDkuNDcgNDk0LjkyIDU1OC4wNyA1MDEuOTIgNTY3LjEyIDUwOC4wOSBDIDU4MS43MCA1MTYuNzggNTk3Ljg2IDUyMy43NiA2MTUuMDIgNTI0LjYyIEMgNjI1LjkyIDUyNC45NyA2MzYuOTcgNTI1LjQyIDY0Ny43MiA1MjMuMjMgQyA2NzMuODMgNTE4LjEwIDY5Ny42OCA1MDIuODUgNzEzLjc0IDQ4MS42OSBDIDcyNS40OSA0NjYuNjQgNzMyLjU0IDQ0OC4xOSA3MzUuMDQgNDI5LjM1IEMgNzM4LjEwIDQwMi4wNCA3MzEuMjkgMzczLjQyIDcxNC44NiAzNTEuMjEgQyA3MDcuNjggMzQxLjA5IDY5OC41MyAzMzIuNTcgNjg4LjUzIDMyNS4yOSBDIDY3Ny4yOCAzMTcuNDMgNjY0LjM3IDMxMi4yMyA2NTEuMDAgMzA5LjI4IEMgNjM5LjU4IDMwNi45NCA2MjcuODEgMzA2LjkzIDYxNi4yMSAzMDcuNjAgTSA0NzMuMTAgNDgzLjIxIEMgNDUwLjM0IDQ5NS40NSA0MjguNjkgNTEwLjA3IDQwOS44OSA1MjcuODYgQyA0MDYuNTMgNTMwLjQ4IDQwMy4zNiA1MzMuMzQgNDAwLjU1IDUzNi41NSBDIDM3OS4yMyA1NTcuODcgMzYxLjAzIDU4Mi40MiAzNDcuMzIgNjA5LjI5IEMgMzM5LjY0IDYyMy4zMSAzMzQuMDkgNjM4LjM0IDMyOC44MSA2NTMuMzggQyAzMjMuNjkgNjY5LjgwIDMxOS42NyA2ODYuNjcgMzE4LjAzIDcwMy44MSBDIDMxNi4xOSA3MTEuNzUgMzE2LjgzIDcxOS45MyAzMTUuNzEgNzI3Ljk2IEMgMzE1LjE1IDczNS41NCAzMTYuMzkgNzQzLjAzIDMxNi40OSA3NTAuNTkgQyAzMjAuMDIgNzUwLjM2IDMyMy40NSA3NTEuMzUgMzI2Ljk2IDc1MS40MSBDIDMzNC4zOCA3NTEuMzkgMzQxLjYxIDc1My4zMiAzNDguODUgNzU0LjczIEMgMzYwLjgyIDc1Ny4xNiAzNzIuMjUgNzYxLjY2IDM4My4yMyA3NjYuOTEgQyAzOTAuMTMgNzcwLjk0IDM5Ny41MyA3NzQuMjQgNDAzLjczIDc3OS4zNiBDIDQxOC4wOSA3ODkuMzcgNDMwLjYyIDgwMi4wMiA0NDAuMjYgODE2LjY1IEMgNDQ1Ljk2IDgyMy44MCA0NDkuODMgODMyLjEyIDQ1My43OSA4NDAuMzAgQyA0NjQuMTQgODYzLjI1IDQ2OC40MSA4ODguOTcgNDY1LjU3IDkxMy45OSBDIDQ2NS4xNyA5MjYuMjIgNDYxLjI2IDkzNy45MyA0NTcuNTkgOTQ5LjUwIEMgNDcwLjg3IDk1OS45NCA0ODYuMDIgOTY3LjY1IDUwMS4wNSA5NzUuMjQgQyA1MjUuNDYgOTg2LjcxIDU1MS4yNiA5OTUuNTggNTc3Ljk4IDk5OS42OSBDIDYwMC43MyAxMDA0LjAzIDYyNC4wMCAxMDA0LjMxIDY0Ny4wOCAxMDAzLjM2IEMgNjU3LjY2IDEwMDIuNDMgNjY4LjE5IDEwMDEuMDIgNjc4LjY2IDk5OS4yNSBDIDcwMS45NyA5OTUuMTkgNzI0LjY0IDk4Ny43NSA3NDYuMjEgOTc4LjEwIEMgNzYyLjkyIDk3MC43OSA3NzguNTIgOTYxLjE3IDc5My43MCA5NTEuMTQgQyA3ODAuOTkgOTE0LjczIDc4My4wNCA4NzMuMzUgNzk5Ljg2IDgzOC41NyBDIDgwMy4wMyA4MzMuMTYgODA1LjQyIDgyNy4zMSA4MDguOTAgODIyLjA5IEMgODE1LjAwIDgxMy4yNyA4MjEuMjYgODA0LjQ4IDgyOC44OSA3OTYuOTAgQyA4NDEuNzggNzgzLjI4IDg1Ny43MCA3NzIuODggODc0LjQ1IDc2NC42NCBDIDg5NC4xNyA3NTUuNzQgOTE1LjY3IDc1MC42NSA5MzcuMzEgNzUwLjMyIEMgOTM3LjIwIDc0OS45MSA5MzYuOTcgNzQ5LjA5IDkzNi44NSA3NDguNjkgQyA5MzguNDQgNzMyLjE3IDkzNi45OSA3MTUuNTggOTM1LjA3IDY5OS4xNyBDIDkyOC4wOSA2NTAuMDAgOTA3Ljk1IDYwMi43MSA4NzcuMjggNTYzLjY1IEMgODcyLjMyIDU1OC4yNSA4NjguMzcgNTUyLjAwIDg2My4wNyA1NDYuOTIgQyA4NTYuODUgNTQwLjc3IDg1MS41MiA1MzMuNzMgODQ0LjYxIDUyOC4zMCBDIDgzOC4wMyA1MjIuMjAgODMxLjM2IDUxNi4xOSA4MjQuMDUgNTEwLjk4IEMgODE1Ljk1IDUwMy44OCA4MDYuNjYgNDk4LjQwIDc5Ny42OCA0OTIuNTIgQyA3ODguNDEgNDg2LjU2IDc3OC42MyA0ODEuNDggNzY4LjU5IDQ3Ni45OSBDIDc2OC4zMSA0NzcuMzIgNzY3Ljc2IDQ3OC4wMCA3NjcuNDggNDc4LjM0IEMgNzYwLjY3IDQ5MS45MyA3NTIuODcgNTA1LjI5IDc0Mi40NyA1MTYuNDkgQyA3MjkuMjIgNTMxLjU2IDcxMi44NiA1NDMuODQgNjk0Ljg1IDU1Mi42NSBDIDY3Ny42MSA1NjEuNzggNjU4LjM1IDU2Ni40NSA2MzkuMDUgNTY4LjUwIEMgNjMyLjM2IDU2OC42OSA2MjUuNjYgNTcwLjAwIDYxOC45OSA1NjguODYgQyA2MDEuNjQgNTY4LjA4IDU4NC40NyA1NjQuMDkgNTY4LjI4IDU1Ny44NSBDIDU1NC4wNSA1NTEuNDQgNTQwLjIyIDU0My43OSA1MjguMzcgNTMzLjU0IEMgNTIyLjk4IDUyOS4zMyA1MTcuODMgNTI0LjgwIDUxMy40OSA1MTkuNTAgQyA1MDIuOTkgNTA5LjE5IDQ5NS4xNiA0OTYuNTcgNDg4LjQ3IDQ4My41NiBDIDQ4Ny4zOCA0ODEuMzMgNDg1LjYxIDQ3OS4zNyA0ODUuMTggNDc2Ljg3IEMgNDgxLjk3IDQ4MC4yMCA0NzYuOTcgNDgwLjgzIDQ3My4xMCA0ODMuMjEgTSAzMDQuNTUgNzk1LjIxIEMgMjg5LjI4IDc5Ni44OSAyNzQuNTIgODAyLjMzIDI2MS4zMCA4MTAuMDcgQyAyNTIuODQgODE1LjgwIDI0NC4xOCA4MjEuNTkgMjM3Ljc3IDgyOS42OSBDIDIyNi4wNiA4NDIuMTMgMjE3LjkxIDg1Ny42OCAyMTMuNDAgODc0LjExIEMgMjEwLjk3IDg4NC45MyAyMDguOTUgODk2LjEyIDIxMC4yNSA5MDcuMjMgQyAyMTAuNzUgOTE4LjgxIDIxMy41OCA5MzAuMjggMjE4LjA1IDk0MC45NiBDIDIyMi4yNCA5NTAuMjggMjI2Ljk4IDk1OS41MyAyMzMuODYgOTY3LjE4IEMgMjQyLjMxIDk3Ny43NyAyNTIuOTMgOTg2LjU2IDI2NC43NCA5OTMuMTUgQyAyNzguMjAgOTk5Ljk3IDI5Mi43OCAxMDA1LjM3IDMwOC4wMSAxMDA1Ljc2IEMgMzE0LjkwIDEwMDYuOTcgMzIxLjgxIDEwMDUuNDEgMzI4LjcyIDEwMDUuMjggQyAzNDguODUgMTAwMi40NiAzNjguMjEgOTkzLjk0IDM4My43MCA5ODAuNzQgQyA0MDUuMTQgOTYyLjUyIDQyMC40NiA5MzYuMjUgNDIyLjU1IDkwNy45MCBDIDQyMi42MSA4OTkuNTkgNDIzLjI2IDg5MS4xNiA0MjEuNjIgODgyLjk2IEMgNDE3LjM3IDg1NC4wMSAzOTkuNTYgODI3Ljc0IDM3NS4wMiA4MTIuMDYgQyAzNTQuNTYgNzk4LjI4IDMyOS4wMiA3OTIuMDggMzA0LjU1IDc5NS4yMSBNIDkyNC41MyA3OTUuMTMgQyA5MDYuNDUgNzk3LjQ3IDg4OC43OCA4MDQuMjIgODc0LjE5IDgxNS4yNCBDIDg0Ny4xOCA4MzQuNDUgODI5LjQ3IDg2Ni42OSA4MjkuMzMgOTAwLjAwIEMgODI4LjU4IDkyMi44NyA4MzYuMDIgOTQ1Ljg2IDg0OS44NCA5NjQuMDggQyA4NTkuNTYgOTc3LjgzIDg3My4zNyA5ODguMTIgODg4LjA1IDk5Ni4wNCBDIDg5Ni4zNSA5OTkuNjAgOTA0LjY5IDEwMDMuNDIgOTEzLjY4IDEwMDQuOTAgQyA5MjQuNjMgMTAwNy4zMiA5MzUuOTIgMTAwNi44MyA5NDcuMDUgMTAwNi40MiBDIDk2OC4yMSAxMDA0LjM2IDk4OC43MSA5OTUuNzAgMTAwNC45MCA5ODEuOTEgQyAxMDEyLjY0IDk3NS45OCAxMDE4Ljc2IDk2OC4yOSAxMDI0LjY3IDk2MC42MSBDIDEwMzUuMTIgOTQ1LjM5IDEwNDEuNjYgOTI3LjQ1IDEwNDMuNDUgOTA5LjA4IEMgMTA0NS4wMyA4ODguMDQgMTA0MC40MSA4NjYuNTYgMTAyOS44OCA4NDguMjUgQyAxMDIwLjkwIDgzMS41MiAxMDA2LjU5IDgxOC4yMCA5OTAuNTkgODA4LjI1IEMgOTcwLjc5IDc5Ni43NCA5NDcuMjEgNzkyLjIxIDkyNC41MyA3OTUuMTMgWiIgLz4NCjxwYXRoIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDYxMS40NyAzNTUuODkgQyA2MTguMDcgMzUzLjc1IDYyNS4xMiAzNTQuMTAgNjMxLjk3IDM1NC4xOCBDIDY0Ny4zMCAzNTQuNDAgNjYxLjIwIDM2Mi42NSA2NzIuMjAgMzcyLjc3IEMgNjgxLjA0IDM4Mi42NSA2ODcuNzAgMzk0LjgxIDY4OS40MiA0MDguMDkgQyA2ODkuOTkgNDE0LjcxIDY4OS45MiA0MjEuMzcgNjg5LjQ1IDQyNy45OSBDIDY4Ny41MyA0NDAuMTIgNjgxLjMwIDQ1MS4xMCA2NzMuNDEgNDYwLjM1IEMgNjYxLjE4IDQ3My4wNiA2NDMuODYgNDgxLjQ0IDYyNS45OSA0ODAuNzAgQyA2MDguODggNDgxLjQ2IDU5Mi40NyA0NzMuMjUgNTgwLjU4IDQ2MS4zNCBDIDU3My45OCA0NTMuMzAgNTY3Ljc2IDQ0NC40OCA1NjUuNDMgNDM0LjE2IEMgNTYyLjkyIDQyMi41MyA1NjIuNTQgNDEwLjEzIDU2Ni40MyAzOTguNzQgQyA1NzIuODMgMzc3Ljk1IDU5MC41OSAzNjEuNTcgNjExLjQ3IDM1NS44OSBaIiAvPg0KPHBhdGggZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gNjUxLjI5IDYxMy4wNiBDIDY1Ny41NiA2MTEuNTQgNjY0LjY0IDYxMS40NyA2NzAuNTAgNjE0LjUwIEMgNjc3Ljc2IDYxOC41NCA2ODIuNzcgNjI2LjYyIDY4Mi40MiA2MzUuMDIgQyA2ODIuMjIgNjQxLjgzIDY3OS4yNSA2NDguMTEgNjc2LjY1IDY1NC4yOSBDIDY2OS4zMCA2NzUuMTIgNjYxLjI2IDY5NS43MCA2NTMuOTYgNzE2LjU1IEMgNjQ5LjM1IDcyOC45OSA2NDQuMjcgNzQxLjI2IDY0MC4xNiA3NTMuODggQyA2MzUuNzkgNzYzLjk1IDYzMi44MCA3NzQuNTQgNjI4LjUyIDc4NC42NCBDIDYyMi43NyA4MDEuNDggNjE2LjAyIDgxNy45NyA2MTAuMDIgODM0LjczIEMgNjA3LjQyIDg0Mi42MSA2MDAuOTAgODQ5LjA4IDU5Mi45MSA4NTEuMzggQyA1ODcuMTkgODUyLjE0IDU4MC45MiA4NTIuNDIgNTc1Ljc0IDg0OS40NyBDIDU2Ni44MCA4NDQuNzYgNTYxLjMzIDgzMy43MSA1NjQuNDEgODIzLjg0IEMgNTY5LjMwIDgwOC42OSA1NzUuNzEgNzk0LjA4IDU4MC43MyA3NzguOTggQyA1OTMuMzAgNzQ1LjM3IDYwNS44NiA3MTEuNzUgNjE4LjA2IDY3OC4wMiBDIDYyMS41MiA2NjguMDAgNjI1LjgwIDY1OC4yNiA2MjguNzEgNjQ4LjA2IEMgNjMwLjcwIDY0Mi41MyA2MzIuOTkgNjM3LjExIDYzNC44MSA2MzEuNTIgQyA2MzcuNDEgNjIzLjUxIDY0Mi45MyA2MTUuNjcgNjUxLjI5IDYxMy4wNiBaIiAvPg0KPHBhdGggZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gNTA5LjEwIDY1MC4xOCBDIDUxMy44OCA2NDYuNjEgNTE4LjE2IDY0MS44NSA1MjQuMjQgNjQwLjYwIEMgNTMxLjE4IDYzOC4zOCA1MzguOTQgNjQwLjEzIDU0NC44NCA2NDQuMTkgQyA1NTUuNjYgNjUyLjE4IDU1Ni40MyA2NzAuMzggNTQ1Ljc5IDY3OC44NiBDIDUzNC44NSA2ODcuOTkgNTIyLjk4IDY5NS45NCA1MTIuMDUgNzA1LjA4IEMgNTAyLjI3IDcxMi4yNCA0OTIuNTcgNzE5LjYzIDQ4My44NSA3MjguMDcgQyA0ODUuODYgNzI4LjI0IDQ4Ni44OSA3MzAuNDYgNDg4LjQyIDczMS41OCBDIDQ5NS44MyA3MzcuODAgNTAyLjc5IDc0NC41NCA1MTAuMzUgNzUwLjU5IEMgNTE2LjI2IDc1Ni40MiA1MjIuOTggNzYxLjMxIDUyOS4xMSA3NjYuODkgQyA1MzQuMjEgNzcxLjQ0IDUzOS44NSA3NzUuNDEgNTQ0LjUxIDc4MC40NCBDIDU0OS4xNiA3ODUuODkgNTUxLjY5IDc5My40MiA1NTAuMDUgODAwLjUzIEMgNTQ4LjAwIDgwNy45NyA1NDIuNTUgODE0Ljg0IDUzNS4wNSA4MTcuMjYgQyA1MjkuMTAgODE5LjI5IDUyMi4zMCA4MTkuMjEgNTE2LjYxIDgxNi40MSBDIDUwOS41MyA4MTMuMjcgNTA0LjczIDgwNi45NSA0OTguODIgODAyLjIxIEMgNDgzLjcwIDc4OC42MSA0NjguNTggNzc1LjAxIDQ1My4xMCA3NjEuODEgQyA0NDUuMTUgNzUzLjQyIDQzNC4wMCA3NDcuODEgNDI4Ljc5IDczNy4wMyBDIDQyNS4wNCA3MjcuOTIgNDI3Ljg5IDcxNi43NiA0MzUuNDIgNzEwLjQxIEMgNDU5Ljg0IDY5MC4xNyA0ODQuNjggNjcwLjQzIDUwOS4xMCA2NTAuMTggWiIgLz4NCjxwYXRoIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDcxMy44MCA2NDIuMDMgQyA3MjEuNjMgNjM3LjkzIDczMS41NSA2MzkuMjkgNzM4LjYxIDY0NC4zMSBDIDc1Ny4yMyA2NTkuNzggNzc1LjkzIDY3NS4xNCA3OTQuNjEgNjkwLjUzIEMgODAxLjg0IDY5NS40OSA4MDguMDIgNzAxLjc4IDgxNS4wOCA3MDYuOTggQyA4MjEuMTUgNzExLjMzIDgyNi4wOCA3MTguMjcgODI1Ljc5IDcyNi4wMiBDIDgyNi40MSA3MzMuNjMgODIyLjAyIDc0MC42OSA4MTYuMzQgNzQ1LjM5IEMgNzkxLjY1IDc2NS45OSA3NjcuMjkgNzg2Ljk2IDc0Mi45OCA4MDcuOTkgQyA3MzcuODkgODEyLjkxIDczMS4zOSA4MTcuMjYgNzIzLjk5IDgxNi42NSBDIDcxNC4yNSA4MTcuMDkgNzA1Ljk2IDgwOS41NiA3MDIuNzMgODAwLjg0IEMgNzAyLjA0IDc5NS43MiA3MDEuNTkgNzkwLjA0IDcwNC41MyA3ODUuNTAgQyA3MDcuOTEgNzc4LjIwIDcxNS4wMyA3NzQuMDEgNzIwLjk3IDc2OS4wNSBDIDczNi4yNSA3NTUuODYgNzUxLjgxIDc0Mi45OSA3NjYuOTIgNzI5LjYwIEMgNzY3LjI2IDcyOS40NiA3NjcuOTUgNzI5LjE3IDc2OC4yOSA3MjkuMDMgQyA3NjkuODAgNzI3LjMxIDc2Ny42OCA3MjUuNjEgNzY2LjUxIDcyNC40NyBDIDc1MS4zNiA3MTIuMjggNzM2LjA3IDcwMC4yNSA3MjAuNzQgNjg4LjI4IEMgNzE0Ljc2IDY4My4yNyA3MDcuNjUgNjc5LjE3IDcwMy42NiA2NzIuMjIgQyA2OTcuOTggNjYxLjY3IDcwMi44MyA2NDYuOTUgNzEzLjgwIDY0Mi4wMyBaIiAvPg0KPHBhdGggZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzA2LjUwIDg0MS4wNyBDIDMxMS42NCA4NDAuMzkgMzE2Ljg4IDgzOS40NyAzMjIuMDUgODQwLjI0IEMgMzM4Ljc5IDg0MS4wOSAzNTQuNDggODUwLjI3IDM2NC45NCA4NjMuMTMgQyAzNzMuOTIgODc0LjY4IDM3OS4xNCA4ODkuMzAgMzc4LjUzIDkwMy45OSBDIDM3OC41MCA5MTcuMTkgMzczLjQ2IDkzMC4wMyAzNjUuNTQgOTQwLjQ3IEMgMzU1LjY2IDk1Mi40MCAzNDEuODUgOTYxLjU3IDMyNi4zNiA5NjMuOTMgQyAzMTMuMzUgOTY1LjkyIDI5OS40NSA5NjQuNTcgMjg3LjgyIDk1OC4wNiBDIDI3NS4xMSA5NTEuNDAgMjY0Ljk2IDk0MC4yNyAyNTkuMTYgOTI3LjE4IEMgMjUzLjYxIDkxMy43MCAyNTIuODUgODk4LjM0IDI1Ni45OSA4ODQuMzcgQyAyNjMuNjIgODYyLjE1IDI4My44NiA4NDUuMTEgMzA2LjUwIDg0MS4wNyBaIiAvPg0KPHBhdGggZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gOTI1LjMwIDg0MS4wNyBDIDkzNy4zMSA4MzkuMDQgOTUwLjAwIDg0MC4wMiA5NjEuMTcgODQ1LjExIEMgOTcwLjczIDg0OS44NCA5NzkuNzQgODU2LjE3IDk4NS45MyA4NjUuMDEgQyA5OTYuNzcgODc5LjAwIDEwMDAuNTYgODk3Ljk3IDk5Ni44OSA5MTUuMTcgQyA5OTEuNDkgOTQzLjgxIDk2My4yNiA5NjYuNDUgOTM0LjAyIDk2NC43MSBDIDkwMi4zMyA5NjUuNDcgODczLjU1IDkzNi42NCA4NzQuMTEgOTA0Ljk5IEMgODcyLjY2IDg4MC44OCA4ODcuNTAgODU3LjQxIDkwOC44OSA4NDYuNzggQyA5MTQuMTkgODQ0LjQ1IDkxOS41MiA4NDEuOTYgOTI1LjMwIDg0MS4wNyBaIiAvPg0KPC9nPg0KPC9zdmc+DQo=';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['uuid', './utils', './JsonDBAdapter'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('uuid'), require('./utils'), require('./JsonDBAdapter'));
    } else {
        // Browser globals
        root.SharexSDK = factory(root.uuid, root.utils, root.JsonDBAdapter);
    }
}(typeof self !== 'undefined' ? self : this, function (uuid, utils, JsonDBAdapter) {
    class SharexSDK {

        // List of private variables
        #preserve_session_id = false; // Default preserve_session_id
        #socket_url = null;
        #has_connected = false;
        #stopped = false;
        #package_name = null; // Default package name
        #uuid = null; // Default uuid

        #connectionStatus = false; // Default connection status
        #websocket_callbacks = null; // Default websocket callbacks
        #reconnect_timer = null; // Default reconnect timer
        #reconnect_timer_interval = 3000; // Default reconnect timer interval

        #db_instance = null; // Default db instance
        #development = false;
        #development_package = null;
        #development_control = null;

        #public_data = {}; // Default public data
        #init_websocket = false; // Default init websocket

        // List of server actions
        #serverActions = {
            INIT_USER: "init_user",
            UPDATE_USER_DATA: "update_user_data",
            GET_ALL_USERS: "get_all_users",
            RETURN_ALL_USERS: "return_all_users",
            USER_LEFT: "user_left",
            USER_ARRIVE: "user_arrive",
            SEND_MSG: "send_msg",
            MSG_ARRIVE: "msg_arrive",
            GET_PUBLIC_DATA_OF_USER: "get_public_data_of_user",
            RETURN_PUBLIC_DATA_OF_USER: "return_public_data_of_user",
            CREATE_JSON_FILE: "create_json_file",
            RETURN_CREATE_JSON_FILE: "return_create_json_file",
            READ_JSON_FILE: "read_json_file",
            RETURN_READ_JSON_FILE: "return_read_json_file",
        };

        // Internal Callback Functions
        #returnAllUsers = null; // Default return all users
        #returnPublicDataOfUser = null; // Default return public data of user
        #returnCreateJSONFile = null; // Default return create json file
        #returnReadJSONFile = null; // Default return read json file

        // Default websocket
        #websocket = null;

        /** 
         * This is a constructor function that initializes a WebSocket connection and sets up various
         * properties and methods for managing the connection and handling server actions.
         * @param [options] - An object containing optional parameters for the constructor.
         */
        constructor(options = {}) {
    
            if(typeof options !== 'object' || options === null) {
                throw new Error('options must be an object');
            }
    
            // Preserve session id
            if(options.hasOwnProperty('preserve_session_id')) {
                // Check if preserve_session_id is a boolean
                if(typeof options.preserve_session_id !== 'boolean') {
                    throw new Error('preserve_session_id must be a boolean');
                }
                this.#preserve_session_id = options.preserve_session_id;
            }
    
            const connection = utils.connectionOptions(options, typeof window === 'undefined' ? null : window.location);
            this.#socket_url = connection.socketUrl;
            this.#package_name = connection.packageName;
            this.#development = options.development !== undefined;
            this.#development_package = this.#development ? (options.development.package_name || options.package_name) : null;
            
            if(!this.#preserve_session_id) {
                // UUID for session
                this.#uuid = uuid.v4();
            }else{
                // Preserve identity across refreshes, without sharing it between browser tabs.
                if(!uuid.validate(sessionStorage.getItem(connection.sessionKey))) {
                    sessionStorage.setItem(connection.sessionKey, uuid.v4());
                }
                this.#uuid = sessionStorage.getItem(connection.sessionKey);
            }
    
            if(options.hasOwnProperty('reconnect_interval')) {
                if(!Number.isFinite(options.reconnect_interval) || options.reconnect_interval <= 0) {
                    throw new Error('reconnect_interval must be a positive finite number');
                }
                this.#reconnect_timer_interval = options.reconnect_interval;
            }
    
            // Public Init Data
            const publicData = options.public_data ?? options.publicData;
            if(publicData !== undefined) {
                if(typeof publicData !== 'object' || publicData === null || Array.isArray(publicData)) {
                    throw new Error('public_data must be an object');
                }
                this.#public_data = publicData;
            }
    
            
        }
    
        /**
         * The `init` function initializes a WebSocket connection and sets up event listeners for various
         * WebSocket events.
         * @param [websocket_callbacks=null] - The `websocket_callbacks` parameter is a callback function
         * that allows you to handle different events that occur with the WebSocket connection. It takes
         * two parameters: the event type (e.g., 'open', 'error', 'close', etc.) and the event object
         * itself.
         */
        init(websocket_callbacks = null) {
            if (websocket_callbacks !== null && typeof websocket_callbacks !== 'function') throw new Error('websocket_callbacks must be a function');
            this.#websocket_callbacks = websocket_callbacks;
            if (this.#websocket !== null) return;
            if (this.#development) this.#mountDevelopmentControl();
            if (!this.#socket_url) {
                this.#setDevelopmentStatus('Paste connection copied from ShareX settings');
                return;
            }
            this.#stopped = false;
            if (this.#reconnect_timer !== null) {
                clearTimeout(this.#reconnect_timer);
                this.#reconnect_timer = null;
            }
            
            // WebSocket Init
            const socket = new WebSocket(this.#socket_url);
            this.#websocket = socket;
            this.#websocket.addEventListener("open", (event) => {
                if (this.#websocket !== socket || this.#stopped) return;
                this.#connectionStatus = true;
                this.#setDevelopmentStatus('Connected to ShareX', 'online');
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.INIT_USER,
                    package_name: this.#package_name,
                    data: {
                        uuid: this.#uuid,
                        public_data: this.#public_data
                    }
                }));
    
                if(this.#has_connected) {
                    if(this.#db_instance !== null) {
                        this.#db_instance.updateInternalWebsocket(this.#websocket);
                    }
                    if(this.#websocket_callbacks != null) {
                        this.#websocket_callbacks('reconnect', event);
                    }
                }else{
                    if(this.#websocket_callbacks != null) {
                        this.#websocket_callbacks('open', event);
                    }
                }
                this.#has_connected = true;
            });
    
            this.#websocket.addEventListener("error", (event) => {
                if (this.#websocket !== socket) return;
                this.#setDevelopmentStatus('Connection failed. Check sharing, connection string, and network.', 'error');
                if (this.#websocket_callbacks != null) {
                    this.#websocket_callbacks('error', event);
                }
            });
    
            this.#websocket.addEventListener("close", (event) => {
                if (this.#websocket !== socket) return;
                this.#connectionStatus = false;
                this.#setDevelopmentStatus('Disconnected. Retrying…');
                this.#init_websocket = false;
                this.#websocket = null;
                if (this.#websocket_callbacks != null) {
                    this.#websocket_callbacks('close', event);
                }
                
                // Reconnect
                if (!this.#stopped) this.#reconnect_timer = setTimeout(() => {
                    if (!this.#stopped) this.init(this.#websocket_callbacks);
                }, this.#reconnect_timer_interval);
            });
    
            this.#websocket.addEventListener("message", (event) => {
                if (this.#websocket !== socket) return;
                let data = event.data;
                try { data = JSON.parse(data); } catch { return; }
                if (!data || typeof data.action !== 'string') return;
                switch (data.action) {
                    case this.#serverActions.RETURN_ALL_USERS:
                        if (this.#returnAllUsers != null) {
                            this.#returnAllUsers(data.all_users);
                        }
                        break;
                    case this.#serverActions.USER_ARRIVE:
                        if (this.#websocket_callbacks != null) {
                            this.#websocket_callbacks(this.#serverActions.USER_ARRIVE, data.user);
                        }
                        break;
                    case this.#serverActions.USER_LEFT:
                        if (this.#websocket_callbacks != null) {
                            this.#websocket_callbacks(this.#serverActions.USER_LEFT, data);
                        }
                        break;
                    case this.#serverActions.MSG_ARRIVE:
                        if (this.#websocket_callbacks != null) {
                            this.#websocket_callbacks(this.#serverActions.MSG_ARRIVE, data.message);
                        }
                        break;
                    case this.#serverActions.RETURN_PUBLIC_DATA_OF_USER:
                        if (this.#returnPublicDataOfUser != null) {
                            this.#returnPublicDataOfUser(data.public_data);
                        }
                        break;
                    case this.#serverActions.RETURN_CREATE_JSON_FILE:
                        if (this.#returnCreateJSONFile != null) {
                            this.#returnCreateJSONFile(data);
                        }
                        break;
                    case this.#serverActions.RETURN_READ_JSON_FILE:
                        if (this.#returnReadJSONFile != null) {
                            this.#returnReadJSONFile(data);
                        }
                        break;
                    default:
                        if(data.action.startsWith('db_action_') && this.#db_instance !== null) {
                            this.#db_instance.websocket_handleDBAction(data);
                        }
                }
            });
    
            // Init WebSocket bool
            this.#init_websocket = true;
        }

        /** Close the connection and cancel retries, including React effect cleanup. */
        disconnect() {
            this.#stopped = true;
            clearTimeout(this.#reconnect_timer);
            this.#reconnect_timer = null;
            const socket = this.#websocket;
            this.#websocket = null;
            this.#connectionStatus = false;
            this.#init_websocket = false;
            if (socket) socket.close();
            this.#has_connected = false;
            this.#db_instance = null;
            this.#development_control?.host.remove();
            this.#development_control = null;
        }

        #setDevelopmentStatus(message, state = 'idle') {
            if (!this.#development_control) return;
            this.#development_control.status.textContent = message;
            this.#development_control.status.dataset.state = state;
        }

        #mountDevelopmentControl() {
            if (this.#development_control || typeof document === 'undefined' || !document.body) return;
            const host = document.createElement('div');
            host.style.cssText = 'position:fixed;z-index:2147483647;right:20px;bottom:20px;font:14px/1.4 system-ui,sans-serif;color:#17212b';
            const root = host.attachShadow({ mode: 'open' });
            root.innerHTML = `<style>
                :host{all:initial} *{box-sizing:border-box}.bubble{width:50px;height:50px;padding:0;border:1px solid #222;border-radius:15px;background:#000;color:#fff;box-shadow:0 6px 20px #0006;cursor:grab;touch-action:none;display:grid;place-items:center;transition:transform .18s cubic-bezier(.2,1.6,.4,1),box-shadow .18s ease}.bubble:hover{transform:translateY(-3px);box-shadow:0 10px 25px #0008}.bubble:active{cursor:grabbing}.bubble img{width:32px;height:32px;object-fit:contain;pointer-events:none;filter:invert(1)}.bounce{animation:bounce .42s cubic-bezier(.2,1.7,.4,1)}@keyframes bounce{0%{transform:scale(.78)}58%{transform:scale(1.14)}100%{transform:scale(1)}}
                .panel{position:absolute;width:min(340px,calc(100vw - 32px));padding:18px;border:1px solid #d9e0e8;border-radius:18px;background:#fff;color:#151a22;box-shadow:0 18px 55px #061b2d38;display:none}.panel[open]{display:block}.panel[data-corner^=top]{top:74px;bottom:auto}.panel[data-corner^=bottom]{bottom:74px;top:auto}.panel[data-corner$=right]{right:0;left:auto}.panel[data-corner$=left]{left:0;right:auto}
                .top{display:flex;align-items:center;gap:10px;margin-bottom:14px}.badge{width:34px;height:34px;border-radius:11px;background:#eff4ff;color:#2563eb;display:grid;place-items:center;font-weight:800}.title{font-weight:750;font-size:15px}.sub{font-size:12px;color:#647482;margin-top:2px}label{display:block;font-size:12px;font-weight:650;margin:14px 0 6px}input{width:100%;padding:11px 12px;border:1px solid #ccd5e0;border-radius:10px;font:13px system-ui;color:#151a22;background:#fff}button.connect{width:100%;margin-top:9px;padding:11px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer}.status{font-size:12px;color:#566773;background:#f2f5f9;padding:10px 11px;border-radius:10px;margin-top:12px;overflow-wrap:anywhere}.status[data-state=online]{color:#087255;background:#e8f7ef}.status[data-state=error]{color:#a83232;background:#fff0f0}.provided{font-size:12px;color:#647482;margin-top:11px}.provided[hidden]{display:none}.close{position:absolute;right:13px;top:12px;border:0;background:none;font-size:20px;color:#71818d;cursor:pointer}
                @media(prefers-color-scheme:dark){.panel{background:#171a21;color:#f4f6fa;border-color:#353c48}.sub,.provided{color:#a7b0bf}.badge{background:#202a3d;color:#93b4ff}input{background:#20242c;border-color:#414958;color:#f4f6fa}.status{background:#222832;color:#c0c8d3}.status[data-state=online]{background:#17352b;color:#9ce0bd}.status[data-state=error]{background:#3b2225;color:#ffb8b8}.close{color:#bbc3d0}}
            </style><button class="bubble" aria-label="ShareX development" title="ShareX development"><img src="${developmentLogo}" alt=""></button><section class="panel" data-corner="bottom-right" aria-label="ShareX development connection"><button class="close" aria-label="Close">×</button><div class="top"><div><div class="title">ShareX development</div><div class="sub">Connect this browser to your phone</div></div></div><form><label for="connection">Development connection</label><input id="connection" type="password" autocomplete="off" spellcheck="false" placeholder="Paste connection from ShareX" required><button class="connect" type="submit">Connect</button></form><div class="provided" hidden>Connection string provided in code</div><div class="status" role="status">Waiting for connection</div></section>`;
            const bubble = root.querySelector('.bubble'), panel = root.querySelector('.panel'), form = root.querySelector('form'), input = root.querySelector('input');
            const status = root.querySelector('.status');
            const provided = root.querySelector('.provided');
            const close = root.querySelector('.close');
            const hasConnection = Boolean(this.#socket_url);
            form.hidden = hasConnection;
            provided.hidden = !hasConnection;
            bubble.addEventListener('click', () => { if (host.dataset.dragged === 'yes') { host.dataset.dragged = ''; return; } panel.toggleAttribute('open'); });
            close.addEventListener('click', () => panel.removeAttribute('open'));
            let drag;
            const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            const placeAtCorner = (corner, animate = false) => {
                const top = corner.startsWith('top'), right = corner.endsWith('right');
                host.style.left = right ? 'auto' : '20px'; host.style.right = right ? '20px' : 'auto';
                host.style.top = top ? '20px' : 'auto'; host.style.bottom = top ? 'auto' : '20px';
                host.dataset.corner = corner; panel.dataset.corner = corner;
                if (animate) { bubble.classList.remove('bounce'); void bubble.offsetWidth; bubble.classList.add('bounce'); }
            };
            bubble.addEventListener('pointerdown', event => {
                const rect = host.getBoundingClientRect();
                drag = { x: event.clientX, y: event.clientY, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, moved: false };
                bubble.setPointerCapture(event.pointerId);
            });
            bubble.addEventListener('pointermove', event => {
                if (!drag) return;
                if (Math.abs(event.clientX - drag.x) + Math.abs(event.clientY - drag.y) > 5) {
                    drag.moved = true;
                    panel.removeAttribute('open');
                    host.dataset.dragged = 'yes';
                    const left = Math.max(0, Math.min(innerWidth - 50, event.clientX - drag.offsetX));
                    const top = Math.max(0, Math.min(innerHeight - 50, event.clientY - drag.offsetY));
                    host.style.left = `${left}px`; host.style.top = `${top}px`;
                    host.style.right = 'auto'; host.style.bottom = 'auto';
                }
            });
            bubble.addEventListener('pointerup', event => {
                if (!drag) return;
                if (drag.moved) {
                    const right = event.clientX >= innerWidth / 2, bottom = event.clientY >= innerHeight / 2;
                    placeAtCorner(`${bottom ? 'bottom' : 'top'}-${right ? 'right' : 'left'}`, true);
                }
                drag = null;
            });
            host.dataset.corner = 'bottom-right';
            window.addEventListener('resize', () => placeAtCorner(host.dataset.corner));
            form.addEventListener('submit', event => {
                event.preventDefault();
                try {
                    const parsed = new URL(input.value.trim());
                    const config = utils.connectionOptions({ development: { server_url: parsed.href, package_name: this.#development_package } });
                    this.#socket_url = config.socketUrl;
                    this.#package_name = config.packageName;
                    form.hidden = true; provided.hidden = false;
                    this.#setDevelopmentStatus('Connecting to ShareX…');
                    this.init(this.#websocket_callbacks);
                } catch (error) { this.#setDevelopmentStatus(error.message, 'error'); }
            });
            document.body.appendChild(host);
            placeAtCorner(host.dataset.corner);
            this.#development_control = { host, status };
            if (hasConnection) this.#setDevelopmentStatus('Connection string provided in code');
        }

        get connectionStatus() { return this.#connectionStatus; }
    
        /**
         * The function creates a new instance of a database with the given name and callbacks.
         * @param db_name - The name of the database that you want to create.
         * @param db_callbacks - The db_callbacks parameter is an object that contains callback functions
         * for various database events. These callback functions are used to handle the response or perform
         * certain actions when these events occur.
         * @returns {JsonDBAdapter} db_instance - An instance of JsonDBAdapter.
        */
        createDBInstance(db_name, db_callbacks) {
            if (!this.#connectionStatus) throw new Error('WebSocket not connected');
            this.#db_instance = new JsonDBAdapter(db_name, this.#websocket, db_callbacks);
            return this.#db_instance;
        }
    
        /**
         * The function sends a message over a WebSocket connection with a specified UUID and message.
         * @param uuid - The `uuid` parameter is a unique identifier for the message recipient. It is used
         * to specify the recipient of the message.
         * @param msg - The `msg` parameter is a string that represents the message you want to send.
         */
        sendMsg(uuid, msg) {
            if (this.#connectionStatus) {
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.SEND_MSG,
                    data: {
                        uuid: uuid,
                        msg: msg
                    }
                }));
            } else {
                throw new Error('WebSocket not initialized');
            }
        }
    
        /**
         * The function returns the public data.
         * @returns The public_data variable is being returned.
         */
        getMyPublicData() {
            return this.#public_data;
        }

        /**
         * The function returns the connection status.
         * @returns The value of the private variable `connectionStatus` is being returned.
         */
        getConnectionStatus() {
            return this.#connectionStatus;
        }
    
        /**
         * The function getMyUUID returns the UUID of the current object.
         * @returns The UUID (Universally Unique Identifier) of the object.
         */
        getMyUUID() {
            return this.#uuid;
        }
    
        /**
         * The function `getAllUsers` sends a request to the server to get all users and returns the result
         * through a callback function.
         * @param callback - The `callback` parameter is a function that will be called once the server
         * responds with the list of all users. It is used to handle the response and perform any necessary
         * actions with the data.
         */
        getAllUsers(callback) {
            if (this.#connectionStatus) {
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.GET_ALL_USERS,
                }));
                this.#returnAllUsers = callback;
            } else {
                throw new Error('WebSocket not initialized');
            }
        }
    
        /**
         * The function sends a request to a server to retrieve public data of a user identified by a UUID,
         * and invokes a callback function with the retrieved data.
         * @param uuid - The `uuid` parameter is a unique identifier for a user. It is used to specify
         * which user's public data should be retrieved.
         * @param callback - The callback parameter is a function that will be called once the public data
         * of the user is retrieved. It is typically used to handle the response or perform additional
         * actions with the data.
         */
        requestPublicData(uuid, callback) {     
            if (this.#connectionStatus) {
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.GET_PUBLIC_DATA_OF_USER,
                    data: {
                        uuid: uuid
                    }
                }));
                this.#returnPublicDataOfUser = callback;
            } else {
                throw new Error('WebSocket not initialized');
            }
        }
    
        /**
         * The function updates the public data and sends it to the server via a websocket.
         * @param data - The `data` parameter is the new public data that you want to update. It should be
         * an object containing the updated information.
         */
        updateMyPublicData(data) {
            if(typeof data === 'object' && data !== null && !Array.isArray(data)) {
                this.#public_data = data;
                this.#websocket.send(JSON.stringify({
                    action: this.#serverActions.UPDATE_USER,
                    data: {
                        public_data: this.#public_data
                    }
                }));
            }else{
                throw new Error('Public data must be an object');
            }
        }

        /**
         * The function `createJSONFile` takes in a filename, data, and callback function, and sends a
         * WebSocket request to create a JSON file with the given filename and data.
         * @param filename - The name of the JSON file you want to create. It should be a string.
         * @param data - The `data` parameter is the JSON data that you want to write to the file. It
         * can be either an object or an array.
         * @param callback - The callback parameter is a function that will be called once the JSON
         * file creation is complete. It is used to handle the result or any errors that may occur
         * during the process.
         */
        createJSONFile(filename, data, callback) {
            if(typeof filename !== 'string') {
                throw new Error('Filename must be a string');
            }
            // Check if data is either an object or an array
            if(typeof data !== 'object' || data === null) {
                throw new Error('Data must be an object or an array');
            }
            if(typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }
            this.#returnCreateJSONFile = callback;
            this.#websocket.send(JSON.stringify({
                action: this.#serverActions.CREATE_JSON_FILE,
                data: {
                    filename: filename,
                    data: data
                }
            }));
        }

        /**
         * The function `readJSONFile` sends a request to a server to read a JSON file and returns the
         * result through a callback function.
         * @param filename - The filename parameter is a string that represents the name of the JSON
         * file that you want to read.
         * @param callback - The `callback` parameter is a function that will be called once the JSON
         * file has been read. It is used to handle the data returned from reading the file.
         */
        readJSONFile(filename, callback) {
            if(typeof filename !== 'string') {
                throw new Error('Filename must be a string');
            }
            if(typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }
            this.#returnReadJSONFile = callback;
            this.#websocket.send(JSON.stringify({
                action: this.#serverActions.READ_JSON_FILE,
                data: {
                    filename: filename
                }
            }));
        }

    }

    return SharexSDK;
}));
