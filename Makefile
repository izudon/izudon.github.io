serve:
	bundler exec jekyll serve --drafts \
	--host=192.168.56.106 2>/dev/null 1>/dev/null
vserve:
	bundler exec jekyll serve --drafts \
	--host=192.168.56.106
build:
	bundler exec jekyll build --drafts
edit:
	emacs _drafts/a.md index.md
wiki:
	cd ../wiki ; pwd ; git pull
	( cd ../wiki ; sh make.sh ) | tee _data/wiki.tsv
daily:
	git add -v index.md
	git commit -m "daily update"
	git push
off:
	sudo shutdown -h now
post:
	( echo "---" ; echo "layout: default" ; date +"date: %Y-%m-%d %H:%M:%S %z" ; echo "---" ) > .post
	echo -n "title: " ; mv .post `date +_posts/%Y-%m-%d-\`head -n 1\`.md`
	emacs `ls -1t _posts/* | head -n 1`
