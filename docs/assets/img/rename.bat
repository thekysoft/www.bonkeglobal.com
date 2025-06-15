@echo off
setlocal enabledelayedexpansion

:: Set the starting number for renaming files
set /a count=1

:: Specify the file extension (e.g., .txt, .jpg, .png, etc.)
set ext=jpg

:: Loop through all files in the current folder with the specified extension
for %%f in (*.%ext%) do (
    ren "%%f" "file-!count!.%ext%"
    set /a count+=1
)

echo All files renamed!
pause
