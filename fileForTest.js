// function log() {
//   console.log('Hello World')
// }
// log()
// log()
// log()
const exec = require('actions-exec-listener');
const github = require('@actions/github');
const core = require('@actions/core');
const tag = core.getInput('tag');

async function aaa() {
  const { stdoutStr: tagsStr } = await exec.exec('git tag');
  console.log(github.context);
  const tags = tagsStr.split(/\n/);
  let cmd = `git log --pretty=format:"%h%x09%an%x09%s"`
  if (tags.length > 2) {
    const prevTag = tags[tags.length - 3];
    cmd = `git log ${prevTag}..${tag} --pretty=format:"%h%x09%an%x09%s"`
  }

  console.log()
  const { stdoutStr: commits } = await exec.exec(cmd);

  console.log(commits)
}

aaa()