export const sections = {
  basics: {
    tag: '// 01 — getting started',
    title: 'The basics',
    desc: 'The commands you use every single day. Master these first — everything else builds on top of them.',
    commands: [
      {
        cmd: 'git init',
        title: 'Initialize a repo',
        desc: 'Creates a new Git repository in the current folder. Run this once at the start of every project.',
        tags: ['safe'],
      },
      {
        cmd: 'git clone <url>',
        title: 'Copy a remote repo',
        desc: 'Downloads a remote repository to your machine. Creates a folder with the project name automatically.',
        tags: ['safe'],
      },
      {
        cmd: 'git status',
        title: 'See what changed',
        desc: 'Shows which files are staged, modified, or untracked. Run this constantly — it never changes anything.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git add .',
        title: 'Stage all changes',
        desc: 'Adds every modified and new file to the staging area. Use git add <file> to be more selective.',
        tags: ['safe'],
      },
      {
        cmd: 'git add <file>',
        title: 'Stage one file',
        desc: 'Adds a specific file to staging. Good habit for keeping commits focused on one thing.',
        tags: ['safe'],
      },
      {
        cmd: 'git commit -m "msg"',
        title: 'Save a snapshot',
        desc: 'Creates a permanent snapshot of staged changes. Write messages in present tense: "add login form", not "added".',
        tags: ['safe'],
      },
      {
        cmd: 'git log --oneline',
        title: 'See commit history',
        desc: 'Shows a compact list of all commits. Each line is one commit with its short hash and message.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git diff',
        title: 'See unstaged changes',
        desc: 'Shows exactly what lines changed in modified files before you stage them. Great before committing.',
        tags: ['safe', 'read-only'],
      },
    ],
  },

  branches: {
    tag: '// 02 — branching',
    title: 'Branches',
    desc: 'Branches let you work on features without touching main. Think of them as parallel timelines of your project.',
    commands: [
      {
        cmd: 'git branch',
        title: 'List all branches',
        desc: 'Shows all local branches. The one with * is your current branch.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git branch <name>',
        title: 'Create a branch',
        desc: 'Creates a new branch from your current position. Does not switch to it — use switch next.',
        tags: ['safe'],
      },
      {
        cmd: 'git switch <name>',
        title: 'Switch branch',
        desc: 'Moves you to another branch. Modern replacement for git checkout <branch>.',
        tags: ['safe'],
      },
      {
        cmd: 'git switch -c <name>',
        title: 'Create & switch',
        desc: 'Creates a new branch AND switches to it in one command. Most common way to start a feature.',
        tags: ['safe'],
      },
      {
        cmd: 'git merge <branch>',
        title: 'Merge a branch',
        desc: 'Brings changes from another branch into your current branch. Run from the destination branch (usually main).',
        tags: ['info'],
      },
      {
        cmd: 'git branch -d <name>',
        title: 'Delete a branch',
        desc: 'Deletes a branch that has already been merged. Git will warn you if it has unmerged changes.',
        tags: ['danger'],
      },
      {
        cmd: 'git branch -D <name>',
        title: 'Force delete a branch',
        desc: 'Deletes a branch even if it has unmerged changes. Permanent — make sure you do not need it.',
        tags: ['danger'],
      },
    ],
  },

  remote: {
    tag: '// 03 — remote & sync',
    title: 'Remote & sync',
    desc: 'Commands for syncing your local work with GitHub or any remote repository.',
    commands: [
      {
        cmd: 'git push',
        title: 'Upload your commits',
        desc: 'Sends your local commits to the remote. First time on a new branch: git push -u origin <branch>.',
        tags: ['info'],
      },
      {
        cmd: 'git push -u origin <branch>',
        title: 'Push a new branch',
        desc: 'Pushes a new local branch to remote and sets it as the tracking branch. Run once per new branch.',
        tags: ['info'],
      },
      {
        cmd: 'git pull',
        title: 'Download + merge',
        desc: 'Fetches remote changes and merges them into your current branch. What you run every morning.',
        tags: ['info'],
      },
      {
        cmd: 'git fetch',
        title: 'Download only',
        desc: 'Gets remote changes but does not merge them. Safe way to see what changed before applying.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git remote -v',
        title: 'See remote URLs',
        desc: 'Shows the name and URL of every connected remote. Usually just "origin".',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git remote add origin <url>',
        title: 'Connect a remote',
        desc: 'Links your local repo to a remote one. Run this after git init when pushing to GitHub for the first time.',
        tags: ['safe'],
      },
    ],
  },

  undo: {
    tag: '// 04 — oh no moments',
    title: 'Undo & fix',
    desc: 'You messed up. It happens. Know which commands are safe and which ones are permanent before running them.',
    commands: [
      {
        cmd: 'git restore <file>',
        title: 'Discard file changes',
        desc: 'Throws away all uncommitted changes in a file and restores it to the last commit. Cannot be undone.',
        tags: ['danger'],
      },
      {
        cmd: 'git restore --staged <file>',
        title: 'Unstage a file',
        desc: 'Removes a file from staging without touching your actual changes. Safe — your edits are kept.',
        tags: ['safe'],
      },
      {
        cmd: 'git commit --amend',
        title: 'Fix the last commit',
        desc: 'Lets you edit the last commit message or add forgotten files. Only use on commits not yet pushed.',
        tags: ['info'],
      },
      {
        cmd: 'git revert <hash>',
        title: 'Undo a commit safely',
        desc: 'Creates a NEW commit that reverses a previous one. Safe for pushed commits — the right way to undo.',
        tags: ['safe'],
      },
      {
        cmd: 'git reset --soft HEAD~1',
        title: 'Undo commit, keep changes',
        desc: 'Moves the last commit back to staging. Your files are unchanged. Great for "I committed too early".',
        tags: ['info'],
      },
      {
        cmd: 'git reset --hard HEAD~1',
        title: 'Nuke the last commit',
        desc: 'Completely removes the last commit AND all its file changes. Permanent if already pushed. Use with care.',
        tags: ['danger'],
      },
      {
        cmd: 'git clean -fd',
        title: 'Delete untracked files',
        desc: 'Permanently removes all untracked files and folders. Run git clean -n first to preview what gets deleted.',
        tags: ['danger'],
      },
    ],
  },

  conflicts: {
    tag: '// 05 — oh no moments',
    title: 'Merge conflicts',
    desc: 'Conflicts happen when two branches changed the same line. They look scary but are always fixable — step by step.',
    commands: [
      {
        cmd: 'git status',
        title: 'Find conflicted files',
        desc: 'After a failed merge, shows which files have conflicts. Look for "both modified" in the output.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git diff',
        title: 'See conflict markers',
        desc: 'Shows the exact conflict markers in your files. Look for <<<<<<<, =======, and >>>>>>> to find conflicts.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git add <file>',
        title: 'Mark as resolved',
        desc: 'After manually editing the conflict in your file, stage it to tell Git you resolved it.',
        tags: ['safe'],
      },
      {
        cmd: 'git commit',
        title: 'Complete the merge',
        desc: 'After staging all resolved files, run this to finish the merge. Git auto-fills the commit message.',
        tags: ['safe'],
      },
      {
        cmd: 'git merge --abort',
        title: 'Cancel the merge',
        desc: 'Cancels the entire merge and returns to the state before you ran git merge. Safe escape hatch.',
        tags: ['danger'],
      },
      {
        cmd: 'git log --merge',
        title: 'See conflicting commits',
        desc: 'Shows only the commits that are causing the conflict. Helps you understand what changed on each side.',
        tags: ['safe', 'read-only'],
      },
    ],
  },

  rebase: {
    tag: '// 06 — advanced',
    title: 'Rebase',
    desc: 'Rebase rewrites history to keep your branch up to date without messy merge commits. Powerful — but never on shared branches.',
    commands: [
      {
        cmd: 'git rebase main',
        title: 'Rebase onto main',
        desc: 'Replays your branch commits on top of the latest main. Creates a clean linear history.',
        tags: ['info'],
      },
      {
        cmd: 'git rebase -i HEAD~3',
        title: 'Interactive rebase',
        desc: 'Opens an editor to squash, reorder, or reword the last 3 commits. Great for cleaning up before a PR.',
        tags: ['info'],
      },
      {
        cmd: 'git rebase --continue',
        title: 'Continue after conflict',
        desc: 'After resolving a conflict during rebase, stage your files then run this to proceed.',
        tags: ['safe'],
      },
      {
        cmd: 'git rebase --abort',
        title: 'Cancel the rebase',
        desc: 'Aborts the entire rebase and returns to the original state. Safe exit when things go wrong.',
        tags: ['danger'],
      },
      {
        cmd: 'git push --force-with-lease',
        title: 'Push after rebase',
        desc: 'Force pushes your rebased branch but only if nobody else pushed to it. Safer than --force.',
        tags: ['danger'],
      },
    ],
  },

  stash: {
    tag: '// 07 — advanced',
    title: 'Stash',
    desc: 'Stash is your clipboard for unfinished work. Park changes temporarily so you can switch branches without committing.',
    commands: [
      {
        cmd: 'git stash',
        title: 'Save work temporarily',
        desc: 'Saves all uncommitted changes to a hidden stack and cleans your working directory.',
        tags: ['safe'],
      },
      {
        cmd: 'git stash pop',
        title: 'Restore stashed work',
        desc: 'Applies the most recent stash back to your working directory and removes it from the stash list.',
        tags: ['safe'],
      },
      {
        cmd: 'git stash list',
        title: 'See all stashes',
        desc: 'Shows all saved stashes with their index. stash@{0} is the most recent.',
        tags: ['safe', 'read-only'],
      },
      {
        cmd: 'git stash apply stash@{2}',
        title: 'Apply a specific stash',
        desc: 'Applies a specific stash by index without removing it from the list.',
        tags: ['safe'],
      },
      {
        cmd: 'git stash drop stash@{0}',
        title: 'Delete a stash',
        desc: 'Permanently removes a specific stash from the list. Use git stash clear to remove all stashes.',
        tags: ['danger'],
      },
      {
        cmd: 'git stash branch <name>',
        title: 'Stash into a new branch',
        desc: 'Creates a new branch, checks it out, and applies your stash to it. Useful when stash conflicts with current work.',
        tags: ['safe'],
      },
    ],
  },
}

export const navSections = [
  {
    label: 'Getting started',
    items: [
      { key: 'basics', label: 'The basics' },
      { key: 'branches', label: 'Branches' },
      { key: 'remote', label: 'Remote & sync' },
    ],
  },
  {
    label: 'Oh no moments',
    items: [
      { key: 'undo', label: 'Undo & fix' },
      { key: 'conflicts', label: 'Merge conflicts' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { key: 'rebase', label: 'Rebase' },
      { key: 'stash', label: 'Stash' },
    ],
  },
]