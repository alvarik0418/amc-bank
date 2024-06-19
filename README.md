# AmcBank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Anotation API Server

An update is made to the api server, in the transactions.model.js file.

It is adjusted so that transactions update the balance and validate the transaction amount greater than the balance when the transaction is of the Withdrawal type.

Replace the logic of the create constant, with this:

An update is made to the api server, in the transactions.model.js file.

It is adjusted so that transactions update the balance and validate the transaction amount greater than the balance when the transaction is of the Withdrawal type.

Replace the logic of the create constant, with this:

    const create = async (payload) => {
         const transactions = await readJson(COLLECTION_PATH)
         let status = 'Success'
         const balance = transactions.at(-1).balance
    
     if (payload.amount > balance && payload.type === 'Withdrawal') {
       throw new Error(`${JSON_PROBLEM_MARKER}: ${JSON.stringify(ERRORS['insufficient-funds'](balance, payload.amount))}`)
     }
    
     if (payload.type === 'Withdrawal') {
       payload.balance = balance - payload.amount
     }
     else if(payload.type === 'Deposit'){
       payload.balance = balance + payload.amount
     }
    
     const transaction = {
       id: uuidv4(),
       ...payload,
       status,
       date: (new Date()).getTime()
     }
    
     transactions.push(transaction)
    
     await writeJson(COLLECTION_PATH, transactions)
    
     return transaction
     }
