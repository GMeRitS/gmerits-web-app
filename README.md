
# GMeRitS web app alpha open source version

This is an early alpha open source version for GMeRitS web app user
interface, based on ongoing work at Mesensei, one of the GMeRitS
partners.

We are in the process of setting up a developer community.  If you are
interested in joining such a community, please send email to
[pekka.nikander@aaltol.fi](mailto:pekka.nikander@aalto.fi).

Please note that the present version of the UI does not have proper
security in place.

## Setting up and testing

At this writing, this user interface depends on the Mesensei developer
infrastructure.  It will later be changed.

You need access to `https://devapi.mesensei.com`

### Acquiring demo app id

For testing this package, you need an app id.  For now, you can use
the app id `mursu`.  However, that is likely to change at any point,
after which that ID will no longer work.

### Installing and running

One time setup:
```
npm install
npm install -g serve
```

Testing, or after any changes:
```
npm run build_dev && serve -s build
```

In your browser, go to `http://localhost:5000/<AppID>` 
where you replace `<AppID>` with your AppId.

## Learn More about React

This project was bootstrapped from [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

