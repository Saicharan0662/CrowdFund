# Decentralized Crowd Funding System

## Why this is built
There are vast number of frauds can be seen in the name of crowd funding in the centralized system. The people have no legit knowledge on how the collected money is used, it might be used for the intended cause but at the same time it can be fraud (cases in Kickstarter for example).
If we move this into decentralized system, we can prevent this from happening, since there is no central source of truth. Instead of putting the control in the hands of manager we can give the control to the contributors, and send the amount directly to recipient.

## My solution to this problem
I built the solution in which manager creates the campaign and creates the request for the funding.
The request contains the information like description, address of recipient, value (amount), approvers count, etc.
The contributors are the approvers here, they have the control weather the money should be transferred or not, if there are at least 51% votes then only it’s possible to send the money and it directly sent to recipient instead of manager to recipient.
The manager has the control to finalize request. Once finalized the money is transferred to the recipient, however it needs to have enough number of approvers.

## Tech Stack Used
- Solidity
- Web3
- Metamask
- React.js
- Next.js
- Semantic UI

## Contributing

Pull requests are welcome.

```bash
git clone <url>
git checkout -b <your branch>
```
After working on it.
```bash
git add .
git commit -m <commit message>
git push origin <your branch>
```

## Contribution


### Please feel free to give it a ⭐