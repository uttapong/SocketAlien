#!/usr/bin/env python
import socket

cmdHost, cmdPort = '192.168.1.100', 23

CmdDelim = '\n'               # Corrected from '\n\r' to '\n'.  Delimiter of Alien commands (sent to reader).
ReaderDelim = '\n'        # Delimiter of Alien reader responses (received from reader).
CmdPrefix = chr(1)            # Causes Alien reader to suppress prompt on response.

def getResponse( conn ):
    ''' Get the reader's response with correct terminator. '''
    response = ''
    while not response.endswith( ReaderDelim ):
        more = conn.recv( 4096 )
        if not more:
            break
        response += more
        print response
    return response

def GetReaderName():
    ''' Log into the reader, get the reader name, then quit. '''
    print 'Sending commands to the Alien reader...'
    cmdSocket = socket.socket( socket.AF_INET, socket.SOCK_STREAM )
    try:
        cmdSocket.connect( (cmdHost, int(cmdPort)) )
    except Exception as inst:
        log( 'Reader Connection Failed: CmdAddr=%s:%d' % (cmdHost, cmdPort) )
        log( '%s' % inst )
        cmdSocket.close()
        return False

    # Read the initial header from the reader.
    print getResponse( cmdSocket )
    #print response

    # UserName
    #print "alien%s" % CmdDelim
    cmdSocket.sendall( 'alien%s' % CmdDelim )
    response = getResponse( cmdSocket )
    print response

    # Password
    cmdSocket.sendall( 'password%s' % CmdDelim )
    response = getResponse( cmdSocket )
    print response

    cmdSocket.sendall( 'Get Time%s' % (CmdDelim) )
    response = getResponse( cmdSocket )
    print response

    # Get ReaderName command
    cmdSocket.sendall( '%sGet ReaderName%s' % (CmdPrefix, CmdDelim) )
    response = getResponse( cmdSocket )
    print response

    # Quit
    cmdSocket.sendall( '%sQuit%s' % (CmdPrefix, CmdDelim) )
    response = getResponse( cmdSocket )
    print response

    cmdSocket.close()
    return True

if __name__ == '__main__':
    print "Hello World"
    GetReaderName()
