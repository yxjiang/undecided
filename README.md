
Feeds
=====================

[TOC]


## TF-IDF
Term frequency:
$$
tf(t,d) = \text{# of appearance of $t$ in $d$}
$$

Inverse document frequency:
$$
idf(t,D) = \log{\frac{|D|}{|d \in D: t \in d|}}
$$

## NDCG
### Discounted Cumulative Gain
Given a list $p$, and the relevant score of each item in the list $rel_i$, the discounted cumulative gain is calculated as follows:

$$
DCG = rel_i + \sum_{i=2}^p \frac{rel_i}{log_2{i}}
$$

An alternative equation with theoretic sound justification for smooth reduction is as follows:
$$
DCG = \sum_{i}^p \frac{2^{rel_i} - 1}{log_2(i + 1)}
$$

> ** Note: ** The above equations demonstrate that the highly relevant items appearing lower in the list would be penalized.

### Normalized Discounted Cumulative Gain

$$
NDCG = \frac{DCG}{IDCG}
$$
where $IDCG$ denotes the ideal $DCG$ that the ranking of the items are ordered by its relevant score $rel_i$.

For example, if the relevant scores of the items are {3, 1, 2, 4, 2}, then the ideal ranking is {4, 3, 2, 2, 1}.

## Pagerank
An query independent approach to measure the quality of items.



# System Design

## News Feed
The goal of news feed is to deliver the right content to the right people at the right time. The candidate news including the actions of the friend and the pages a person like.

### Architecture
1. Store data in distributed file system, e.g. HBase.
2. Cache recent data in distributed cache.

### Workflow
For each user, cache the latest 50 actions (using memcached).
When a user access the homepage, do the following things:

1. Retrieve the friend list.
2. Retrieve all the actions of the friends, there should be tens of thousands of them.
3. Rank the actions based on relevance and only shows the top 45 actions.

### Ranking
Consider factors:

1. Number of likes, shares and comments by others.
2. How many 'I don't want to see'.
3. The preference to a certain post type.
4. How often a person interacts with the friend, page, or the public figure who posts the action.
5. How complete a profile is who posts the message.
6. Whether the fan base of the one who posts the message has large overlap with the one who posts high quality messages.
7. The device and network speed of user.


## Messenger

The goal is to design a scalable messenger that supports real time 1 on 1 or group message.

### Architecture:
Publish/subscribe pattern.
All the messages of the users are stored into the queue, and when the user connected to the server, the messages are sent to them.

* **Presence servers**: store the information of the online users. Support two operations: 1. read a list of users' status. 2. write information shipped from the channel servers.
* **Channel servers**: message queue and delivery. Deliver message in each user's channel. Long poll from the client to the channel servers.
* **ChMessageat log servers**: stores the chat history.


### Workflow
1. When user open messenger via browser, mobile or client software. A persistent connection is made between the client and the channel server. The server is chosen by the load balancer.


The client maintains a persistent channel to the server via MQTT protocal, which is specifically designed for machine-to-machine communication and with low-overhead.


## Timeline

### Components
* MySQL for storage and replication
* Memcache for caching
* Thrift for communication
* Multi feed for ranking

### Storage (Details is available at [here](http://backchannel.org/blog/friendfeed-schemaless-mysql))
Use mysql as a key/value storage. 
All the entities are stored in a table, and each index is represented by a separate table. Therefore, the operations on indices will not block the operations on the entities.



## Search Box Suggestion
How to design and implement the auto-suggestion for search box? The suggested query should be ranked by correlation.

### Solution 1: Trie
How to add priority? Friends, two-degree friends, current popular query



## Mobile Search Point of Interests
How to design and implement the function of find and rank the POI in the mobile search?

### Solution: Spatial index




# Question
Sure, I am very interested in this session, the previous interviews makes me learn a lot of facebook, and I want to learn more.

1. Suppose a new learning algorithm is proposed, evaluated via A/B testing and shows a little bit higher CTR. However, such improvement would significantly increase the complexity. In such condition, how do the engineers treat the new proposed learning algorithm? Do they totally abandon it, or try to find the useful part of it?

2. When an existing machine learning solution is very difficult to be improved anymore, How do the engineers identify whether it is caused by the inherent limitation of the model or the limitation of the features, or the limitation of the learning algorithm.

3. Are there any technical talks or discussion panel so that people can learn from each other? Is there any chance to have a talk with the persons who were in charge of the famous projects or even work with them?

