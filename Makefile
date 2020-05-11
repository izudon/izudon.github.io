serve:
	bundler exec jekyll serve --host=0.0.0.0 2>/dev/null 1>/dev/null
vserve:
	bundler exec jekyll serve --host=0.0.0.0
build:
	bundler exec jekyll build
wiki:
	cd ../wiki ; pwd ; git pull
	( cd ../wiki ; sh make.sh ) | tee _data/wiki.tsv
daily:
	git add index.md
	git commit -m "daily update"
	git push
post:
	emacs `TZ=Asia/Tokyo date +"_post/%Y-%m-%d-%H_%M_%S.markdown"`
