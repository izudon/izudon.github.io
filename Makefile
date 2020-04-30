serve:
	\bundler exec jekyll serve --host=0.0.0.0 2>/dev/null 1>/dev/null
build:
	\bundler exec jekyll build
post:
	emacs `TZ=Asia/Tokyo date +"_post/%Y-%m-%d-%H_%M_%S.markdown"`
