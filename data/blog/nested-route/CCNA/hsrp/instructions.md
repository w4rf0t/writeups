---
draft: true
---
![image](https://user-images.githubusercontent.com/61643034/199155036-54a2361c-edae-436e-9e55-f4dbd38832d8.png)

# Background / Scenario
Spanning Tree Protocol provides loop-free redundancy between switches within a LAN. However, it does not provide redundant default gateways for end-user devices within the network if a gateway router fails. First Hop Redundancy Protocols (FHRPs) provide redundant default gateways for end devices with no additional end-user configuration necessary. By using a FHRP, two or more routers can share the same virtual IP address and MAC address and can act as a single virtual router. Hosts on the network are configured with a shared IP address as their default gateway. In this Packet Tracer activity, you will configure Cisco’s Hot Standby Router Protocol (HSRP), which is an FHRP.

You will configure HSRP on routers R1 and R3, which serve as the default gateways for the hosts on LAN 1 and LAN 2. When you configure HSRP, you will create a virtual gateway that uses the same default gateway address for hosts in both LANs. If one gateway router becomes unavailable, the second router will take over using the same default gateway address that was used by the first router. Because the hosts on the LANs are configured with the IP address of the virtual gateway as the default gateway, the hosts will regain connectivity to remote networks after HSRP activates the remaining router.

# Instructions
Part 1: Verify Connectivity
Step 1: Trace the path to the Web Server from PC-A.
a.     Go to the desktop of PC-A and open a command prompt.

b.     Trace the path from PC-A to the webserver by executing the tracert 209.165.200.226 command.

**Question:**

Which devices are on the path from PC-A to the Web Server? Use the addressing table to determine the device names.

Step 2: Trace the path to the Web Server from PC-B.
Repeat the process in Step 1 from PC-B.

**Question:**

Which devices are on the path from PC-B to the Web Server?

Step 3: Observe the network behavior when R3 becomes unavailable.
a.     Select the delete tool from the Packet Tracer tool bar and delete the link between R3 and S3.

b.     Open a command prompt on PC-B. Execute the tracert command with the Web Server as the destination.

c.     Compare the current output with the output of the command from Step 2.

**Question:**

What are the results?

d.     Click the Connections icon in the lower left corner of the PT window. Locate and select the Copper Straight-Through icon in the pallet of connection types.

e.     Click on S3 and select port GigbitEthernet0/2. Click R3 and select port GigabitEthernet0/0.

f.      After the link lights on the connection are both green, test the connection by pinging the Web Server. The ping should be successful.

Part 2: Configure HSRP Active and Standby Routers
Step 1: Configure HSRP on R1.
a.     Configure HSRP on the G0/1 LAN interface of R1.

Open configuration window

R1(config)# interface g0/1

b.     Specify the HSRP protocol version number. The most recent version is version 2.

Note: Standby version 1 only supports IPv4 addressing.

R1(config-if)# standby version 2

c.     Configure the IP address of the virtual default gateway. This address must be configured on any hosts that require the services of the default gateway. It replaces the physical interface address of the router that has been previously configured on the hosts.

Multiple instances of HSRP can be configured on a router. You must specify the HSRP group number to identify the virtual interface between routers in a HSRP group. This number must be consistent between the routers in the group. The group number for this configuration is 1.

R1(config-if)# standby 1 ip 192.168.1.254

d.     Designate the active router for the HSRP group. It is the router that will be used as the gateway device unless it fails or the path to it becomes inactive or unusable. Specify the priority for the router interface. The default value is 100. A higher value will determine which router is the active router. If the priorities of the routers in the HSRP group are the same, then the router with the highest configured IP address will become the active router.

R1(config-if)# standby 1 priority 150

R1 will operate as the active router and traffic from the two LANs will use it as the default gateway.

e.     If it is desirable that the active router resume that role when it becomes available again, configure it to preempt the service of the standby router. The active router will take over the gateway role when it becomes operable again.

R1(config-if)# standby 1 preempt

**Question:**

What will the HSRP priority of R3 be when it is added to HSRP group 1?

Step 2: Configure HSRP on R3.
Configure R3 as the standby router.

a.     Configure the R3 interface that is connected to LAN 2.

b.     Repeat only steps 1b and 1c above.

Step 3: Verify HSRP Configuration
a.     Verify HSRP by issuing the show standby command on R1 and R3. Verify the values for HSRP role, group, virtual IP address of the gateway, preemption, and priority. Note that HSRP also identifies the active and standby router IP addresses for the group.

R1# show standby

GigabitEthernet0/1 - Group 1 (version 2)

State is Active

4 state changes, last state change 00:00:30

Virtual IP address is 192.168.1.254

Active virtual MAC address is 0000.0C9F.F001

Local virtual MAC address is 0000.0C9F.F001 (v2 default)

Hello time 3 sec, hold time 10 sec

Next hello sent in 1.696 secs

Preemption enabled

Active router is local

Standby router is 192.168.1.3

Priority 150 (configured 150)

Group name is "hsrp-Gi0/1-1" (default)

 

R3# show standby

GigabitEthernet0/0 - Group 1 (version 2)

State is Standby

4 state changes, last state change 00:02:29

Virtual IP address is 192.168.1.254

Active virtual MAC address is 0000.0C9F.F001

Local virtual MAC address is 0000.0C9F.F001 (v2 default)

Hello time 3 sec, hold time 10 sec

Next hello sent in 0.720 secs

Preemption disabled

Active router is 192.168.1.1

MAC address is d48c.b5ce.a0c1

Standby router is local

Priority 100 (default 100)

Group name is "hsrp-Gi0/0-1" (default)

Using the output shown above, answer the following questions:

**Question:**

Which router is the active router?

What is the MAC address for the virtual IP address?

What is the IP address and priority of the standby router?

b.     Use the show standby brief command on R1 and R3 to view an HSRP status summary. Sample output is shown below.

R1# show standby brief

P indicates configured to preempt.

|

Interface Grp Pri P State Active Standby Virtual IP

Gi0/1 1 150 P Active local 192.168.1.3 192.168.1.254

 

R3# show standby brief

P indicates configured to preempt.

|

Interface Grp Pri P State Active Standby Virtual IP

Gi0/0 1 100 Standby 192.168.1.1 local 192.168.1.254

c.     Change the default gateway address for PC-A, PC-C, S1, and S3.

**Question:**

Which address should you use?

Verify the new settings. Issue a ping from both PC-A and PC-C to the Web Server. Are the pings successful?

Close configuration window

Part 3: Observe HSRP Operation
Step 1: Make the active router become unavailable.
Open a command prompt on PC-B and enter the command tracert 209.165.200.226.

**Question:**

Does the path differ from the path used before HSRP was configured?

Step 2: Break the link to R1.
a.     Select the delete tool from the Packet Tracer toolbar and delete the cable that connects R1 to S1.

b.     Immediately return to PC-B and execute the tracert 209.165.200.226 command again. Observe the output of the command until the command completes execution. You may need to repeat the trace to see the full path.

**Question:**

How was this trace different from the previous trace?

HSRP undergoes a process to determine which router should take over when the active router becomes unavailable. This process takes time. Once the process is complete, the R3 standby router becomes active and is used as the default gateway for hosts on LAN 1 and LAN 2.

Step 3: Restore the link to R1.
a.     Re-connect R1 to S1 with a copper straight-through cable.

b.     Execute a trace from PC-B to the Web Server. You may need to repeat the trace to see the full path.

**Question:**

What path is used to reach the Web Server?

If the preempt command was not configured for the HSRP group on R1, would the results have been the same?

End of document
