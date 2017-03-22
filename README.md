# Project for review the issue 5428 of Ant Design
Issue [5428](https://github.com/ant-design/ant-design/issues/5428) of `ant design`.

## Install and execute the tests
```
$ git clone ...
$ cd ant-design-issue_5428
$ nmp install
$ npm test
```

## Create this project from zero:

1. Create the project with `create-react-app`:
  ```
  $ create-react-app ant-design-issue_5428
  $ cd ant-design-issue_5428
  ```

2. Add `ant design` and `react-test-renderer` for doing snapshots:
  ```
  $ yarn add antd
  $ yarn add react-test-renderer
  ```

3. Modify the test file `src/app.test.js` for adding the snapshot:
  ```
  import React from 'react';
  import ReactDOM from 'react-dom';
  import renderer from 'react-test-renderer';
  import App from './App';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('snapshot matchs', () => {
    const tree = renderer.create(
      <App />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  ```

4. Run the tests. A snapshot will be created:
  ```
  PASS  src/App.test.js
   ✓ renders without crashing (20ms)
   ✓ snapshot matchs (7ms)

  Snapshot Summary
  › 1 snapshot written in 1 test suite.

  Test Suites: 1 passed, 1 total
  Tests:       2 passed, 2 total
  Snapshots:   1 added, 1 total
  Time:        0.976s, estimated 1s
  Ran all test suites.
  ```

5. The snapshot generated in `src/__snapshots__/App.test.js.snap` have this code:
  ```
  exports[`test snapshot matchs 1`] = `
  <div
    className="App">
    <div
      className="App-header">
      <img
        alt="logo"
        className="App-logo"
        src="logo.svg" />
      <h2>
        Welcome to React
      </h2>
    </div>
    <p
      className="App-intro">
      To get started, edit
      <code>
        src/App.js
      </code>
       and save to reload.
    </p>
  </div>
  `;
  ```

6. Add `ant design` CSS file in the file `src\App.css`. For make this, the first line of this file must be:
  ```
  @import '~antd/dist/antd.css';
  ```

7. Now we will use the amazing `ant design` collection of components. Let's take the [tabs](https://ant.design/components/tabs/) component. Replace the code of `src/App.js` with this code:
  ```
  import React, { Component } from 'react';
  import './App.css';
  import { Tabs } from 'antd';
  const TabPane = Tabs.TabPane;

  class App extends Component {
    callback(key) {
      console.log(key);
    }

    render() {
      return (
        <div className="App">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
      );
    }
  }

  export default App;
  ```

8. Run the project and check the tabs component is well loaded:
  ```
  $ yarn start
  ```

9. Run the tests.
  ```
  $ yarn test
  ```
 It will return an error message:
 ```
 matchMedia not present, legacy browsers require a polyfill
 ```

10. For solving this issue, create the file `src\setupTests.js` and Copy&Paste this code:
  ```
  window.matchMedia = window.matchMedia || function() {
      return {
          matches : false,
          addListener : function() {},
          removeListener: function() {}
      };
  };
  ```

## The problem
Either you downloaded the project or you created it from zero, you will find this problem when you run the tests:
  ```
  $ yarn test
  ```

  ```
  FAIL  src/App.test.js
   ● snapshot matchs

     TypeError: Cannot read property 'ownerDocument' of null

       at offset (node_modules/rc-tabs/lib/InkTabBarMixin.js:44:17)
       at _componentDidUpdate (node_modules/rc-tabs/lib/InkTabBarMixin.js:63:25)
       at componentDidMount (node_modules/rc-tabs/lib/InkTabBarMixin.js:116:5)
       at chainedFunction [as componentDidMount] (node_modules/react/lib/ReactClass.js:521:9)
       at node_modules/react-test-renderer/lib/ReactCompositeComponent.js:265:25
       at measureLifeCyclePerf (node_modules/react-test-renderer/lib/ReactCompositeComponent.js:75:12)
       at node_modules/react-test-renderer/lib/ReactCompositeComponent.js:264:11
       at CallbackQueue.notifyAll (node_modules/react-test-renderer/lib/CallbackQueue.js:76:22)
       at ReactTestReconcileTransaction.close (node_modules/react-test-renderer/lib/ReactTestReconcileTransaction.js:36:26)
       at ReactTestReconcileTransaction.closeAll (node_modules/react-test-renderer/lib/Transaction.js:206:25)
       at ReactTestReconcileTransaction.perform (node_modules/react-test-renderer/lib/Transaction.js:153:16)
       at batchedMountComponentIntoNode (node_modules/react-test-renderer/lib/ReactTestMount.js:69:27)
       at ReactDefaultBatchingStrategyTransaction.perform (node_modules/react-test-renderer/lib/Transaction.js:140:20)
       at Object.batchedUpdates (node_modules/react-test-renderer/lib/ReactDefaultBatchingStrategy.js:62:26)
       at Object.batchedUpdates (node_modules/react-test-renderer/lib/ReactUpdates.js:97:27)
       at Object.render (node_modules/react-test-renderer/lib/ReactTestMount.js:125:18)
       at Object.<anonymous>.it (src/App.test.js:12:70)

   ✓ renders without crashing (29ms)
   ✕ snapshot matchs (8ms)

  Test Suites: 1 failed, 1 total
  Tests:       1 failed, 1 passed, 2 total
  Snapshots:   0 total
  Time:        1.685s
  Ran all test suites.

  ```
