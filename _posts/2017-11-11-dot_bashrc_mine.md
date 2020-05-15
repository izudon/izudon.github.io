---
---

自分用 ~/.bashrc の覚書。

```
###
### Original Settings
###

alias rm="rm -iv"
alias cp="cp -iv"
alias ln="ln -iv"
alias mv="mv -iv"
alias la="ls -aF"
alias ll="ls -lF"
alias lt="ls -altrF"

HISTFILE=~/.bash_history  #-- 履歴保存ファイルの名前
HISTSIZE=2000             #-- 履歴記憶件数
HISTFILESIZE=1000         #-- ファイルに保存する履歴数

#HISTCONTROL=ignorespace  #-- スペースやタブで始まる行をヒストリに記録しない
#HISTCONTROL=ignoredups   #-- 入力が最後のヒストリと一致する場合に記録しない
HISTCONTROL=ignoreboth    #-- ignorespaceとignoredups両方を指定
#HISTCONTROL=             #-- すべての入力をヒストリに記録する

### シェルを日本語（utf-8）
export LANG=ja_JP.utf8

### プロンプトに色を
PS1='\e[32m\u@\h\e[m \e[33m\t\e[m '
PS1='[ \u@\h \t \W ] '
```
