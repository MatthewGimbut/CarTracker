# # #
#
#
# 04.15.2017
# # #

import smtplib
import argparse
from email import mime
from email.mime import multipart
from email.mime.text import MIMEText

args = argparse.ArgumentParser()
args.add_argument("addr")
args.add_argument("text")

# Account info
username = "info.cartracker@gmail.com"
password = "CarTracker123"
fromaddr = "info.cartracker@gmail.com"

toaddr = args.addr
text = args.text


# Sends text message with report to toaddrs
def send(subject, body):
    # Format message
    msg = mime.multipart.MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = subject
    msg.attach(mime.text.MIMEText(body, 'plain'))
    message = msg.as_string()

    # Send message
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username, password)
    server.sendmail(fromaddr, toaddr, message)
    server.quit()


send("Your Daily CarTracker Update", text)
