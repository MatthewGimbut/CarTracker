# # #
#
#
# 04.15.2017
# # #


import smtplib
import MySQLdb
from email import mime
from email.mime import multipart
from email.mime.text import MIMEText

# Username for email account to log into
username = "info.cartracker@gmail.com"
# Password for email account to log into
password = "CarTracker123"
# Address to send mail from
fromaddr = "info.cartracker@gmail.com"
# Address to send mail to (@att.txt.net)
toaddr = "" # = "mikecrinite@gmail.com"

# Connect to database
db = MySQLdb.connect(host="mikedb.clzedg3q1dlc.us-west-2.rds.amazonaws.com",    # your host, usually localhost
                     user="MikeDB",                                             # your username
                     passwd="moscariello",                                      # your password
                     db="CarTrackerInfo")                                       # name of the data base


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

# Cursor object allows you to query the database
cur = db.cursor()

# SQL Queries begin here
# cur.execute("SELECT email FROM users WHERE users.notifPref="daily")
cur.execute("SELECT email FROM users WHERE users.email='mikecrinite@gmail.com'")

# print all the first cell of all the rows
for row in cur.fetchall():
    send("test", "test")
